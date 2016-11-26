import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import classnames from 'classnames';
import 'react-select/dist/react-select.css';

import updateAutocomplete from '../actions/updateAutocomplete';
import updateQuantity from '../actions/updateQuantity';
import addItemToList from '../actions/addItemToList';

// Should the quantity box be marked as invalid?
// If a quantity is marked as invalid, the "accept" button on the right isn't
// shown.
function isBadQuantityForItem(item, quantity) {
  if (item && item.requireQuantityIn && item.requireQuantityIn.unit === 'custom') {
    // If the item doesn't end with one of the quantitys, then it has a bad quantity.
    return !item.requireQuantityIn.customChoices.find(choice => quantity.endsWith(choice));
  } else {
    // If it doesn't require custom units, then anything works!
    return true;
  }
}

export function AddNewSearchBox({
  items,
  autocompleteValue,
  autocompleteQuantity,
  selectedItem,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onUpdateAddQuantity,
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
        options={items.map(i => ({value: i, label: i.name}))}
        placeholder="Add a new item..."
        className={classnames(
          autocompleteValue && autocompleteValue.type === 'item' ? 'item-is-selected' : null
        )}
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
  };
})(AddNewSearchBox);
