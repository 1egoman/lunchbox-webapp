import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import classnames from 'classnames';
import 'react-select/dist/react-select.css';

import updateAutocomplete from '../actions/updateAutocomplete';
import updateQuantity from '../actions/updateQuantity';
import addItemToList from '../actions/addItemToList';
import fetchRemoteRecipes from '../actions/fetchRemoteRecipes';
import resetRemoteRecipes from '../actions/resetRemoteRecipes';

// Should the quantity box be marked as invalid?
// If a quantity is marked as invalid, the "accept" button on the right isn't
// shown.
function isBadQuantityForItem(item, quantity) {
  if (item && item.requireQuantityIn && item.requireQuantityIn.unit === 'custom') {
    // If the item doesn't end with one of the quantities, then it has a bad quantity.
    return !item.requireQuantityIn.customChoices.find(choice => quantity.endsWith(choice));
  } else if (item && item.type === 'item') {
    // If it doesn't require custom units, then anything that follows the format
    // of a number, then a space, then starting to type a unit should match..
    return !(/[0-9] ./.exec(quantity));
  } else if (item && item.type === 'list') {
    // Lists take a multiple of themselves for a quantity (so, just an int)
    return !(/^[0-9]+$/.exec(quantity));
  } else {
    // Definately a bad quantity when the item is falsey :(
    return true;
  }
}

export function AddNewSearchBox({
  items,
  autocompleteValue,
  autocompleteQuantity,
  selectedItem,
  remoteRecipes,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onUpdateAddQuantity,
  onFetchRemoteRecipes,
  onSelectBlur,
}) {
  // FIXME: refactor to put this function down below
  function addNewItem() {
    onAddNewItemToList(selectedItem._id, autocompleteValue, autocompleteQuantity);
    onUpdateAddQuantity(""); // empty the add quantity box
    onUpdateAddAutocomplete(null); // reset the autocomplete
  }

  if (selectedItem && selectedItem.type === "list" && selectedItem) {
    let hasBadQuantity = isBadQuantityForItem(autocompleteValue, autocompleteQuantity);

    return <div className="add-new-search-box">
      {/* Add a new item. This is messed up for some reason. */}
      <Select
        options={[
          ...items.map(i => ({value: i, label: i.name})),
          {value: undefined, label: 'Type to search for external recipes', disabled: true},
          ...remoteRecipes.map(i => ({value: i, label: `Add ${i.title}`})),
        ]}
        placeholder="Add a new item..."
        className={classnames(
          autocompleteValue ? 'item-is-selected' : null
        )}
        onInputChange={onFetchRemoteRecipes}
        onChange={({value}) => {
          // before an item can inputted add a quantity first!
          onUpdateAddAutocomplete(value);
        }}
        onBlur={onSelectBlur}
      />

      {/* Quantity input */}
      {autocompleteValue ? <div className={classnames('quantity-box', {'bad-quantity': hasBadQuantity})}>
        <input
          type="text"
          onChange={event => onUpdateAddQuantity(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !hasBadQuantity) {
              addNewItem();
            } else if (event.key === 'Escape') {
              onUpdateAddQuantity(""); // empty the add quantity box
              onUpdateAddAutocomplete(null); // reset the autocomplete
            }
          }}
          placeholder={`Enter quantity of item ${autocompleteValue.name}`}
          value={autocompleteQuantity}
        />

        <button onClick={addNewItem}>
          <i className="fa fa-paper-plane-o" />
        </button>
      </div> : null}

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
    remoteRecipes: state.remoteRecipes,
    // the id of the selected item from the url
    selectedItem: props.selectedItem,
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
    onFetchRemoteRecipes(data) {
      dispatch(fetchRemoteRecipes(data));
    },
    onSelectBlur() {
      dispatch(resetRemoteRecipes());
    },
  };
})(AddNewSearchBox);
