import React from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';

import updateAutocomplete from '../actions/updateAutocomplete';
import addItemToList from '../actions/addItemToList';
import deleteItemFromList from '../actions/deleteItemFromList';

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
      {/* Add a new item */}
      <span>Type an item name to add to list...</span>
      <Autocomplete
        value={autocompleteValue}
        items={items}
        shouldItemRender={i => i.listType === "recipe" || i.type === "item"}
        sortItems={(a, b, value) => {
          return a.name.toLowerCase().indexOf(value.toLowerCase()) >
          b.name.toLowerCase().indexOf(value.toLowerCase()) ? -1 : 1
        }}
        getItemValue={item => item.name}
        onChange={(e, v) => onUpdateAddAutocomplete(v)}
        onSelect={(e, v) => onAddNewItemToList(grocery._id, v)}
        renderItem={(item, isHighlighted) => (
          <div
            style={isHighlighted ? {color: 'red'} : {}}
            key={item._id}
          >{item.name}</div>
        )}
      />

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
    <span onClick={onDelete.bind(null, item)}>&times;</span>
  </li>;
}


export default connect(state => {
  return {
    grocery: state.items && state.items.find(i => i.listType === 'grocery'),
    items: state.items,
    autocompleteValue: state.autocompleteValue,
  };
}, dispatch => {
  return {
    onUpdateAddAutocomplete(data) {
      dispatch(updateAutocomplete(data));
    },
    onAddNewItemToList(listId, item) {
      dispatch(addItemToList(listId, item));
    },
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
  };
})(GroceryList);
