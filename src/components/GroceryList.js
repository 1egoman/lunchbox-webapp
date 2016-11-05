import React from 'react';
import {connect} from 'react-redux';

import deleteItemFromList from '../actions/deleteItemFromList';
import getItemForId from '../helpers/getItemForId';

export function GroceryList({
  grocery,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onDeleteItemFromList,
}) {
  if (grocery) {
    return <div>
      <h1>Grocery List</h1>
      {grocery.contents.map((item, ct) => {
        return <ListItem
          key={`${ct}-${item._id}`}
          item={item}
          
          onDelete={onDeleteItemFromList.bind(null, grocery._id)}
        />;
      })}
    </div>;
  } else {
    return null;
  }
}

export function ListItem({item, onDelete}) {
  return <li>
    <span>{item.name}</span>
    <strong>{item.quantity}</strong>
    <span onClick={onDelete.bind(null, item)}>&times;</span>
  </li>;
}


export default connect(state => {
  return {
    grocery: getItemForId(state, state.selectedItem),
    items: state.items,
  };
}, dispatch => {
  return {
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
  };
})(GroceryList);
