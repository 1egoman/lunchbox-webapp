import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import updateAutocomplete from '../actions/updateAutocomplete';
import updateQuantity from '../actions/updateQuantity';
import addItemToList from '../actions/addItemToList';
import getItemForId from '../helpers/getItemForId';
import {push} from 'react-router-redux';

export function SearchForItem({
  items,
  selectedItem,

  onSelectItemToView,
}) {
  if (selectedItem) {
    return <div className="app-searchbox">
      {/* Add a new item. This is messed up for some reason. */}
      <Select
        options={items.map(i => ({value: i, label: i.name}))}
        placeholder="Jump to item..."
        onBlurResetsInput={false}
        onChange={({value}) => onSelectItemToView(value)}
      />
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
    onSelectItemToView(item) {
      dispatch(push(`/items/${item._id}`));
    }
  };
})(SearchForItem);
