import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {push} from 'react-router-redux';

export function ItemList({
  items,
  selectedItem,
  children,
  
  onSwitchActiveItem,
  onCreateItem,
}) {
  return <div className="app-container">
    <div className="app-sidebar">
      <ul>
        <li onClick={onCreateItem}>+&nbsp;&nbsp;Create new item</li>

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
      </ul>
    </div>

    {children}
  </div>;
}

export default connect(
  (state, props) => ({
    items: state.items,
    selectedItem: state.selectedItem,
    children: props.children,
  }),
  dispatch => ({
    onSwitchActiveItem(itemId) {
      dispatch(push(`/items/${itemId}`));
    },
    onCreateItem(itemId) {
      dispatch(push(`/items/new`));
    },
  })
)(ItemList);
