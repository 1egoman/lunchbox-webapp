import React from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';

import updateAutocomplete from '../actions/updateAutocomplete';
import addItemToList from '../actions/addItemToList';

export function GroceryList({
  grocery,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
}) {
  if (grocery) {
    return <div>
      {/* Add a new item */}
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
      {grocery.contents.map(item => {
        return <li key={item._id}>{item.name}</li>;
      })}
    </div>;
  } else {
    return null;
  }
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
  };
})(GroceryList);
