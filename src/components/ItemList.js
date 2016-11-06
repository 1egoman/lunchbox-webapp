import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import switchActiveItem from '../actions/switchActiveItem';

export function ItemList({items, selectedItem, onSwitchActiveItem}) {
  return <ul>
    {items.map(item => {
      return <li
        key={item._id}
        onClick={onSwitchActiveItem.bind(null, item._id)}
        className={classnames(
          selectedItem === item._id ? "active" : null,
          item.type === "item" ? "is-item" : null,
          item.listType === "recipe" ? "is-recipe" : null
        )}
      >
        {item.name}
      </li>;
    })}
  </ul>;
}

export default connect(
  state => ({items: state.items, selectedItem: state.selectedItem}),
  dispatch => ({
    onSwitchActiveItem(itemId) {
      dispatch(switchActiveItem(itemId));
    },
  })
)(ItemList);
