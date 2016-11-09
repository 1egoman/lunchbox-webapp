import React from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {push} from 'react-router-redux';

import ItemImage from './ItemImage';

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
            {/* A picture of the food */}
            <ItemImage item={item} />

            {/* The label for the food */}
            <div className="text-container">
              <h4>{item.name}</h4>
              <span>{
                item.contents ?
                `${item.contents.length} items` :
                `An item`
              }</span>
            </div>
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
    selectedItem: props.params.id,
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
