import React from 'react';
import {connect} from 'react-redux';

export function GroceryList({grocery}) {
  if (grocery.contents) {
    return <div>
      <h1>Grocery List</h1>
      {grocery.contents.map(item => {
        return <li key={item._id}>{item.name}</li>;
      })}
    </div>;
  } else {
    return null;
  }
}


export default connect(state => {
  return {grocery: state.grocery};
}, dispatch => {
  return {};
})(GroceryList);
