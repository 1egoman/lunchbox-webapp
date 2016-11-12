import React from 'react';
import {connect} from 'react-redux';

import deleteItemFromList from '../actions/deleteItemFromList';
import getItemForId from '../helpers/getItemForId';
import AddNewSearchBox from './AddNewSearchBox';
import Dropzone from 'react-dropzone';
import ItemImage from './ItemImage';

import uploadImage from '../actions/uploadImage';

export function ListContainer({
  selectedItem,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onDeleteItemFromList,
  onDropImage,
}) {
  if (selectedItem) {
    return <div className="app-detail">
      {/* The image */}
      <ItemImage item={selectedItem} />

      <h1>{selectedItem.name}</h1>
      {selectedItem.type === 'list' ? <ul>
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
      </ul> : null}

      {/* Add a new item to the specified list */}
      <AddNewSearchBox selectedItem={selectedItem} />

      <Dropzone
        onDrop={files => files.length && onDropImage(selectedItem, files[0])}
        className="image-dropzone"
        activeClassName="active"
        rejectClassName="reject"
      >
        Drag or click to select a title image
      </Dropzone>
    </div>;
  } else {
    return null;
  }
}

export function ListItem({item, onDelete}) {
  return <li>
    <span className="item-name">{item.name}</span>
    <span className="item-quantity">{item.quantity || 1}</span>
    <span className="item-close" onClick={onDelete.bind(null, item)}>
      &times;
    </span>
  </li>;
}


export default connect((state, props) => {
  // if the route is /grocery, get the grocery list
  // TODO: probably a bettwr, more modular way to do this.
  let preselectedItem;
  if (props.location.pathname.startsWith('/grocery')) {
    preselectedItem = state.items.find(i => i.listType === 'grocery');
  } else if (props.location.pathname.startsWith('/pantry')) {
    preselectedItem = state.items.find(i => i.listType === 'pantry');
  }

  return {
    selectedItem: preselectedItem || getItemForId(state, props.routeParams.id),
    items: state.items,
  };
}, dispatch => {
  return {
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
    onDropImage(item, file) {
      dispatch(uploadImage(file, item));
    },
  };
})(ListContainer);
