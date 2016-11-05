import React from 'react';
import {connect} from 'react-redux';

import switchActiveItem from '../actions/switchActiveItem';

export function ItemList({items, onSwitchActiveItem}) {
  return <ul>
    <h1>All items</h1>
    {items.map(item => {
      return <li key={item._id} onClick={onSwitchActiveItem.bind(null, item._id)}>
        {item.name}
      </li>;
    })}
  </ul>;
}

export default connect(
  state => ({items: state.items}),
  dispatch => ({
    onSwitchActiveItem(itemId) {
      dispatch(switchActiveItem(itemId));
    },
  })
)(ItemList);
