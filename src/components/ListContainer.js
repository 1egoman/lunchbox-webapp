import React from 'react';
import {connect} from 'react-redux';

import deleteItemFromList from '../actions/deleteItemFromList';
import getItemForId from '../helpers/getItemForId';
import AddNewSearchBox from './AddNewSearchBox';

export function ListContainer({
  selectedItem,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onDeleteItemFromList,
}) {
  if (selectedItem) {
    return <div className="app-detail">
      <h1>{selectedItem.name}</h1>
      <ul>
        <li className="header">
          <span className="item-name">Name</span>
          <span className="item-quantity">Quantity</span>
          <span className="item-close"></span>
        </li>
        {selectedItem.contents.map((item, ct) => {
          return <ListItem
            key={`${ct}-${item._id}`}
            item={item}
            
            onDelete={onDeleteItemFromList.bind(null, selectedItem._id)}
          />;
        })}
      </ul>

      {/* Add a new item to the specified list */}
      <AddNewSearchBox selectedItem={selectedItem} />
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
    selectedItem: getItemForId(state, props.routeParams.id),
    items: state.items,
  };
}, dispatch => {
  return {
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
  };
})(ListContainer);
