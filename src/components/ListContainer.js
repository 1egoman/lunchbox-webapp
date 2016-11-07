import React from 'react';
import {connect} from 'react-redux';

import deleteItemFromList from '../actions/deleteItemFromList';
import getItemForId from '../helpers/getItemForId';

export function ListContainer({
  grocery,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onDeleteItemFromList,
}) {
  if (grocery) {
    return <div className="app-detail">
      <h1>{grocery.name}</h1>
      <ul>
        <li className="header">
          <span className="item-name">Name</span>
          <span className="item-quantity">Quantity</span>
          <span className="item-close"></span>
        </li>
        {grocery.contents.map((item, ct) => {
          return <ListItem
            key={`${ct}-${item._id}`}
            item={item}
            
            onDelete={onDeleteItemFromList.bind(null, grocery._id)}
          />;
        })}
      </ul>
    </div>;
  } else {
    return null;
  }
}

export function ListItem({item, onDelete}) {
  return <li>
    <span className="item-name">{item.name}</span>
    <span className="item-quantity">{item.quantity}</span>
    <span className="item-close" onClick={onDelete.bind(null, item)}>
      &times;
    </span>
  </li>;
}


export default connect((state, props) => {
  return {
    grocery: getItemForId(state, props.routeParams.id),
    items: state.items,
  };
}, dispatch => {
  return {
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
  };
})(ListContainer);
