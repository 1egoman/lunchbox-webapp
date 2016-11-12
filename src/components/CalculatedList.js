import React from 'react';
import {connect} from 'react-redux';

export function Price({price}) {
  if (price.totalCost) {
    return <span>
      {price.totalCost} ({price.unitsRequired} at {price.pricePerUnit} each)
    </span>;
  } else {
    return <span className="disabled">(no price)</span>;
  }
}

export function CalculatedList({calculatedList}) {
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
        </li>;
      })}
    </ul>
  </div>;
}

export default connect(state => ({
  calculatedList: state.calculatedList,
}), dispatch => ({
  foo: 1 // TODO: add methods here!
}))(CalculatedList);
