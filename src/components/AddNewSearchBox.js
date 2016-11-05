import React from 'react';
import {connect} from 'react-redux';
import Autocomplete from 'react-autocomplete';

import updateAutocomplete from '../actions/updateAutocomplete';
import addItemToList from '../actions/addItemToList';

export function AddNewSearchBox({
  items,
  autocompleteValue,
  selectedItem,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
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
      onSelect={(e, v) => onAddNewItemToList(selectedItem, v)}
      renderItem={(item, isHighlighted) => (
        <div
          style={isHighlighted ? {color: 'red'} : {}}
          key={item._id}
        >{item.name}</div>
      )}
    />
  </div>;
}

export default connect(state => {
  return {
    items: state.items,
    autocompleteValue: state.autocompleteValue,
    selectedItem: state.selectedItem, // the id of the selected item
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
})(AddNewSearchBox);
