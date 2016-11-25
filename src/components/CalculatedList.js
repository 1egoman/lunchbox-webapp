import React from 'react';
import {connect} from 'react-redux';

import checkCalculatedItem from '../actions/checkCalculatedItem';
import uncheckCalculatedItem from '../actions/uncheckCalculatedItem';

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
            onChange={e => onListItemChecked(i.item._id, e.target.checked)}
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
}), dispatch => ({
  onListItemChecked(itemId, checkedState) {
    if (checkedState) {
      dispatch(checkCalculatedItem(itemId));
    } else {
      dispatch(uncheckCalculatedItem(itemId));
    }
  },
}))(CalculatedList);
