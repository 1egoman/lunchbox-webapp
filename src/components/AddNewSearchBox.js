import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import classnames from 'classnames';
import 'react-select/dist/react-select.css';

import updateAutocomplete from '../actions/updateAutocomplete';
import updateQuantity from '../actions/updateQuantity';
import addItemToList from '../actions/addItemToList';
import getItemForId from '../helpers/getItemForId';

export function AddNewSearchBox({
  items,
  autocompleteValue,
  autocompleteQuantity,
  selectedItem,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onUpdateAddQuantity,
}) {
  if (selectedItem && selectedItem.type === "list" && selectedItem) {
    return <div className="app-searchbox">
      {/* Add a new item. This is messed up for some reason. */}
      <Select
        options={items.map(i => ({value: i, label: i.name}))}
        placeholder="Add a new item..."
        className={classnames(autocompleteValue.type === 'item' ? 'item-is-selected' : null)}
        onChange={({value}) => {
          if (value.type === "list") {
            // Lists don't need a quantity so add them out of the gate!
            onAddNewItemToList(selectedItem._id, value, autocompleteQuantity);
            onUpdateAddAutocomplete(null); // reset the autocomplete
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
        onKeyDown={event => {
          if (event.key === 'Enter') {
            onAddNewItemToList(selectedItem._id, autocompleteValue, autocompleteQuantity);
            onUpdateAddQuantity(""); // empty the add quantity box
          }
        }}
        placeholder={`Enter quantity of item ${autocompleteValue.name}`}
        value={autocompleteQuantity}
      /> : null}
    </div>;
  } else {
    return null;
  }
}

export default connect((state, props) => {
  return {
    items: state.items,
    autocompleteValue: state.autocompleteValue.data,
    autocompleteQuantity: state.autocompleteValue.quantity,
    // the id of the selected item from the url
    selectedItem: getItemForId(state, props.routeParams.id),
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
