import React from 'react';
import {connect} from 'react-redux';

import deleteItemFromList from '../actions/deleteItemFromList';
import getItemForId from '../helpers/getItemForId';
import AddNewSearchBox from './AddNewSearchBox';
import Dropzone from 'react-dropzone';
import ItemImage from './ItemImage';

import uploadImage from '../actions/uploadImage';
import {WithContext as ReactTags} from 'react-tag-input';
import changeCustomQuantity from '../actions/changeCustomQuantity';
import updateItemInList from '../actions/updateItemInList';

export function ListContainer({
  selectedItem,
  items,
  autocompleteValue,

  onUpdateAddAutocomplete,
  onAddNewItemToList,
  onDeleteItemFromList,
  onDropImage,
  onAddCustomQuantity,
  onRemoveCustomQuantity,
  onChangeQuantityType,
  onUpdateItemInList,
}) {
  if (selectedItem) {
    return <div className="app-detail">
      {/* The image */}
      <ItemImage item={selectedItem} />

      <h1>{selectedItem.name}</h1>

      {selectedItem.recipeHref ? <a
        target="_blank"
        href={selectedItem.recipeHref}
      >Recipe</a> : null}

      {selectedItem.type === 'list' ? <ul>
        <li className="header">
          <span className="item-name">Name</span>
          <span className="item-quantity">Quantity</span>
          <span className="item-close"></span>
        </li>
        {selectedItem.contents.map((item, ct) => {
          return <ListItem
            key={`${ct}-${item._id}`}
            item={item}
            
            onDelete={onDeleteItemFromList.bind(null, selectedItem._id)}
            onUpdateItemInList={onUpdateItemInList.bind(null, selectedItem._id)}
          />;
        })}
      </ul> : null}

      {/* Add a new item to the specified list */}
      <AddNewSearchBox selectedItem={selectedItem} />

      {/* Specify a custom quantity for an item */}
      {selectedItem.type === 'item' ? <div className="custom-quantity">
        <div className="icon">
          <img alt="Custom Quantity" src="images/scale.png" />
        </div>

        <ul className="content">
          <h4>I measure this item by...</h4>
          <li>
            <input
              type="radio"
              name="quantityName"
              id="radio-all"
              onChange={onChangeQuantityType.bind(null, selectedItem, 'all')}
              checked={selectedItem.requireQuantityIn ? selectedItem.requireQuantityIn.unit === 'all' : true}
            />
            <label id="radio-all">All</label>
          </li>

          <li>
            <input
              type="radio"
              name="quantityName"
              id="radio-volume"
              onChange={onChangeQuantityType.bind(null, selectedItem, 'volume')}
              checked={selectedItem.requireQuantityIn ? selectedItem.requireQuantityIn.unit === 'volume' : false}
            />
            <label htmlFor="radio-volume">Volume</label>
          </li>

          <li>
            <input
              type="radio"
              name="quantityName"
              id="radio-mass"
              onChange={onChangeQuantityType.bind(null, selectedItem, 'mass')}
              checked={selectedItem.requireQuantityIn ? selectedItem.requireQuantityIn.unit === 'mass' : false}
            />
            <label htmlFor="radio-mass">Mass</label>
          </li>

          <li>
            <input
              type="radio"
              name="quantityName"
              id="radio-custom"
              onChange={onChangeQuantityType.bind(null, selectedItem, 'custom')}
              checked={selectedItem.requireQuantityIn ? selectedItem.requireQuantityIn.unit === 'custom' : false}
            />
            <label htmlFor="radio-custom">Custom</label>
          </li>
        </ul>

        {/* Only show custom quantities when using a 'custom' type */}
        {selectedItem.requireQuantityIn && selectedItem.requireQuantityIn.unit === 'custom' ? <div className="content custom-quantity-tags">
          <h3>Custom Units</h3>
          <ReactTags
            tags={selectedItem.requireQuantityIn ? selectedItem.requireQuantityIn.customChoices.map(i => ({id: i, text: i})) : []}
            handleAddition={onAddCustomQuantity.bind(null, selectedItem)}
            handleDelete={onRemoveCustomQuantity.bind(null, selectedItem)}
          />
        </div>: null}
      </div> : null}

      {/* Add an image to the item */}
      <Dropzone
        onDrop={files => files.length && onDropImage(selectedItem, files[0])}
        className="image-dropzone"
        activeClassName="active"
        rejectClassName="reject"
      >
        Drag or click to select a title image
      </Dropzone>
    </div>;
  } else {
    return null;
  }
}

export function ListItem({item, onDelete, onUpdateItemInList}) {
  return <li>
    <span className="item-name">
      {item.name}
      &nbsp;
      {/* Recipes that are added remotely have a link to their recipe */}
      {item.recipeHref ? <a target="_blank" href={item.recipeHref}>Recipe</a> : null}

      {/* Add custom notes to an item */}
      <input
        type="text"
        placeholder="(add any notes)"
        value={item.notes || ''}
        onChange={event => onUpdateItemInList(item._id, {notes: event.target.value})}
      />
    </span>
    <input
      type="text"
      className="item-quantity"
      placeholder="eg, 1 cup"
      value={item.quantity || ''}
      onChange={event => onUpdateItemInList(item._id, {quantity: event.target.value || '1'})}
    />
    <span className="item-close" onClick={onDelete.bind(null, item)}>
      &times;
    </span>
  </li>;
}


export default connect((state, props) => {
  // if the route is /grocery, get the grocery list
  // TODO: probably a bettwr, more modular way to do this.
  let preselectedItem;
  if (props.location.pathname.startsWith('/grocery')) {
    preselectedItem = state.items.find(i => i.listType === 'grocery');
  } else if (props.location.pathname.startsWith('/pantry')) {
    preselectedItem = state.items.find(i => i.listType === 'pantry');
  }

  return {
    selectedItem: preselectedItem || getItemForId(state, props.routeParams.id),
    items: state.items,
  };
}, dispatch => {
  return {
    onDeleteItemFromList(listId, item) {
      dispatch(deleteItemFromList(listId, item));
    },
    onDropImage(item, file) {
      dispatch(uploadImage(file, item));
    },
    onChangeQuantityType(item, newQuantityType) {
      // Change the quantity type
      dispatch(changeCustomQuantity(
        item,
        newQuantityType, 
        item.requireQuantityIn ? item.requireQuantityIn.customChoices : []
      ));
    },
    onAddCustomQuantity(item, quantityItem) {
      // Add a new custom quantity unit
      dispatch(changeCustomQuantity(item, 'custom', [
        ...(item.requireQuantityIn ? item.requireQuantityIn.customChoices : []),
        quantityItem,
      ]));
    },
    onRemoveCustomQuantity(item, index) {
      // Remove a custom quantity unit
      let customChoices = item.requireQuantityIn.customChoices.slice();
      customChoices.splice(index, 1);
      dispatch(changeCustomQuantity(item, 'custom', customChoices));
    },
    onUpdateItemInList(listId, itemId, data) {
      dispatch(updateItemInList(listId, itemId, data));
    },
  };
})(ListContainer);
