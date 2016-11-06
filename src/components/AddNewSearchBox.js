import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
  if (selectedItem) {
    return <div className="app-searchbox">
      {/* Add a new item. This is messed up for some reason. */}
      <Select
        options={items.map(i => ({value: i, label: i.name}))}
        onChange={({value}) => {
          // value={autocompleteValue && autocompleteValue.name || ''}
          // onChange={(e, v) => onUpdateAddAutocomplete(v)}
          // onChange={(e, v) => onAddNewItemToList(selectedItem, v, autocompleteQuantity)}
          if (value.type === "list") {
            // Lists don't need a quantity so add them out of the gate!
            onAddNewItemToList(selectedItem, value, autocompleteQuantity);
          } else {
            // before an item can inputted add a quantity first!
            onUpdateAddAutocomplete(value);
          }
        }}
      />

      {/* Quantity input */}
      {autocompleteValue ?  <input
        type="text"
        onChange={event => onUpdateAddQuantity(event.target.value)}
        placeholder="ie, 1 cup"
        value={autocompleteQuantity}
      /> : null}
    </div>;
  } else {
    return null;
  }
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
