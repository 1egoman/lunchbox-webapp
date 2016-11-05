import React from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';

import updateAutocomplete from '../actions/updateAutocomplete';
import updateQuantity from '../actions/updateQuantity';
import addItemToList from '../actions/addItemToList';

export function AddNewSearchBox({
  items,
  autocompleteValue,
  autocompleteQuantity,
  selectedItem,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onUpdateAddQuantity,
}) {
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
      onSelect={(e, v) => onAddNewItemToList(selectedItem, v, autocompleteQuantity)}
      renderItem={(item, isHighlighted) => (
        <div
          style={isHighlighted ? {color: 'red'} : {}}
          key={item._id}
        >{item.name}</div>
      )}
    />

    {/* Quantity input */}
    <input
      type="text"
      onChange={event => onUpdateAddQuantity(event.target.value)}
      placeholder="ie, 1 cup"
      value={autocompleteQuantity}
    />
  </div>;
}

export default connect(state => {
  return {
    items: state.items,
    autocompleteValue: state.autocompleteValue.data,
    autocompleteQuantity: state.autocompleteValue.quantity,
    selectedItem: state.selectedItem, // the id of the selected item
  };
}, dispatch => {
  return {
    onUpdateAddAutocomplete(data) {
      dispatch(updateAutocomplete(data));
    },
    onUpdateAddQuantity(quantity) {
      dispatch(updateQuantity(quantity));
    },
    onAddNewItemToList(listId, item, quantity) {
      dispatch(addItemToList(listId, item, quantity));
    },
  };
})(AddNewSearchBox);
