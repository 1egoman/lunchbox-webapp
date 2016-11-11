import React from 'react';
import {connect} from 'react-redux';

export function CalculatedList({calculatedList}) {
  return <div className="app-calc-list">
    <h1>Calculated List</h1>
    <ul>
      {calculatedList.map(i => <li key={i.item.name}>{i.item.name}</li>)}
    </ul>
  </div>;
}

export default connect(state => ({
  calculatedList: state.calculatedList,
}), dispatch => ({
  foo: 1 // TODO: add methods here!
}))(CalculatedList);
