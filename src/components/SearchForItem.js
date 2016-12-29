import React from 'react';
import {connect} from 'react-redux';
import 'react-select/dist/react-select.css';
import 'react-fuzzy-picker/styles/index.css';

import {push} from 'react-router-redux';

import {FuzzyPicker, FuzzyWrapper} from 'react-fuzzy-picker'

export function SearchForItem({
  items,
  onSelectItemToView,
}) {
  // This is the code from above, just wrapped in a factory function.
  function renderFuzzyPicker(isOpen, onClose) {
    if (items.length) {
      return <FuzzyPicker
        label="Search for list or item"
        isOpen={isOpen}
        onClose={onClose}
        onChange={itemName => {
          // Select the thing
          onSelectItemToView(items, itemName);
          // Close it
          onClose();
        }}
        items={items.map(i => i.name)}
      />;
    } else {
      return null;
    }
  }

  // Here, we check what key must be pressed to open the fuzzy picker
  // We'll use the '/' key for this example.
  function isCorrectKeyPressed(event) {
    return (
      event.key === '/' ||
      (event.key === 'p' && (event.ctrlKey || event.metaKey))
    )
  }

  return <FuzzyWrapper
    isKeyPressed={isCorrectKeyPressed}
    popup={renderFuzzyPicker}
  />;
}

export default connect((state, props) => {
  return {
    items: state.items,
  };
}, dispatch => {
  return {
    onSelectItemToView(items, itemName) {
      let item = items.find(({name}) => name === itemName);
      if (!item) {
        return
      } else if (item.listType === 'grocery') {
        dispatch(push(`/grocery`));
      } else if (item.listType === 'pantry') {
        dispatch(push(`/pantry`));
      } else {
        dispatch(push(`/items/${item._id}`));
      }
    }
  };
})(SearchForItem);
