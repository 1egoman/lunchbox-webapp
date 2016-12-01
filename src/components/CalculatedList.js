import React from 'react';
import {connect} from 'react-redux';
import Unitz from 'unitz';

import addItemToList from '../actions/addItemToList';
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
  pantry,

  onAddItemToPantry,
}) {
  return <div className="app-calc-list">
    <h1>Calculated List</h1>
    <ul>
      {calculatedList.map(i => {
        return <li key={i.item.name}>
          <span className="name">{i.item.name}</span>
          <span className="quantity">{i.item.quantity}</span>
          <span className="price">
            <Price price={i.price} />
          </span>
          <button onClick={onAddItemToPantry.bind(null, pantry, i.item)}>
            Add to Pantry
          </button>
        </li>;
      })}
    </ul>
  </div>;
}

export default connect(state => ({
  calculatedList: state.calculatedList,
  pantry: state.items.find(({listType}) => listType === 'pantry'),
}), dispatch => ({
  onAddItemToPantry(pantry, item, checkedState) {
    let itemOfSameTypeAlreadyInPantry = pantry.contents.find(i => i._id === item._id);

    // Also, when an item is checked off (since it has been bought), add it to
    // the pantry.
    if (itemOfSameTypeAlreadyInPantry) {
      // Add more of an item
      dispatch(updateItemInList(pantry._id, item._id, {
        quantity: Unitz.best(
          Unitz.combine(item.quantity, itemOfSameTypeAlreadyInPantry.quantity)
        ).normal,
      }));
    } else {
      // Add the first amount of an item
      dispatch(addItemToList(pantry._id, item, item.quantity));
    }
  },
}))(CalculatedList);
