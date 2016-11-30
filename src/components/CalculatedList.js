import React from 'react';
import {connect} from 'react-redux';
import Unitz from 'unitz';

import checkCalculatedItem from '../actions/checkCalculatedItem';
import uncheckCalculatedItem from '../actions/uncheckCalculatedItem';
import addItemToList from '../actions/addItemToList';
import deleteItemFromList from '../actions/deleteItemFromList';
import updateItemInList from '../actions/updateItemInList';

export function Price({price}) {
  if (price.totalCost) {
    return <span>
      {price.totalCost} ({price.unitsRequired} at {price.pricePerUnit} each)
    </span>;
  } else {
    return <span className="disabled">(no price)</span>;
  }
}

export function CalculatedList({
  calculatedList,
  calculatedListMetadata,
  pantry,

  onListItemChecked,
}) {
  return <div className="app-calc-list">
    <h1>Calculated List</h1>
    <ul>
      {calculatedList.map(i => {
        // is the checkbox for this item checked?
        let isChecked = calculatedListMetadata[i.item._id] ?
          calculatedListMetadata[i.item._id].checked :
          false;

        return <li key={i.item.name}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={e => onListItemChecked(pantry, i.item, e.target.checked)}
          />
          <span className="name">{i.item.name}</span>
          <span className="quantity">{i.item.quantity}</span>
          <span className="price">
            <Price price={i.price} />
          </span>
        </li>;
      })}
    </ul>
  </div>;
}

export default connect(state => ({
  calculatedList: state.calculatedList,
  calculatedListMetadata: state.calculatedListMetadata,
  pantry: state.items.find(({listType}) => listType === 'pantry'),
}), dispatch => ({
  onListItemChecked(pantry, item, checkedState) {
    let itemOfSameTypeAlreadyInPantry = pantry.contents.find(i => i._id === item._id);
    if (checkedState) {
      // Check off an item
      dispatch(checkCalculatedItem(item._id));

      // Also, when an item is checked off (since it has been bought), add it to
      // the pantry.
      if (itemOfSameTypeAlreadyInPantry) {
        // Add more of an item
        dispatch(updateItemInList(pantry._id, item._id, {
          quantity: Unitz.best(Unitz.combine(item.quantity, itemOfSameTypeAlreadyInPantry.quantity)).normal,
        }));
      } else {
        // Add the first amount of an item
        dispatch(addItemToList(pantry._id, item, item.quantity));
      }
    } else {
      // uncheck an item
      dispatch(uncheckCalculatedItem(item._id));

      // When an item is unchecked, remove it from the pantry
      if (itemOfSameTypeAlreadyInPantry) {
        // Remove some of an item
        dispatch(updateItemInList(pantry._id, item._id, {
          quantity: Unitz.best(Unitz.subtract(itemOfSameTypeAlreadyInPantry.quantity, item.quantity)).normal,
        }));
      } else {
        // Remove all of an item
        dispatch(deleteItemFromList(pantry._id, item));
      }
    }
  },
}))(CalculatedList);
