import React from 'react';
import {connect} from 'react-redux';
import {WithContext as ReactTags} from 'react-tag-input';
import Dropzone from 'react-dropzone';

import AddNewSearchBox from './AddNewSearchBox';
import ItemImage from './ItemImage';
import QuantityPicker from './QuantityPicker';

import uploadImage from '../actions/uploadImage';
import deleteItemFromList from '../actions/deleteItemFromList';
import changeCustomQuantity from '../actions/changeCustomQuantity';
import updateItemInList from '../actions/updateItemInList';
import changeQuantityPreset from '../actions/changeQuantityPreset';

import getItemForId from '../helpers/getItemForId';

export function ItemDetail({
  item,
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
	onChangeQuantityPreset,
}) {
  if (item) {
    return <div className="app-detail">
      {/* The image */}
      <ItemImage item={item} />

      <h1>{item.name}</h1>

      {item.recipeHref ? <a
        target="_blank"
        href={item.recipeHref}
      >Recipe</a> : null}

      <div className="card-group">
        {/* Things have custom preset quantities */}
        <CustomPresetQuantity
          item={item}
          onChange={onChangeQuantityPreset.bind(null, item)}
        />

        {/* Specify a custom quantity for an item */}
        {item.type === 'item' ? <div className="custom-quantity pt-card pt-elevation-1">
          <div className="header">
            <img alt="Custom Quantity" src="images/scale.png" />
            <h4>I measure this item by...</h4>
          </div>

          <ul className="content">
            <li>
              <input
                type="radio"
                name="quantityName"
                id="radio-all"
                onChange={onChangeQuantityType.bind(null, item, 'all')}
                checked={item.requireQuantityIn ? item.requireQuantityIn.unit === 'all' : true}
              />
              <label id="radio-all">All</label>
            </li>

            <li>
              <input
                type="radio"
                name="quantityName"
                id="radio-volume"
                onChange={onChangeQuantityType.bind(null, item, 'volume')}
                checked={item.requireQuantityIn ? item.requireQuantityIn.unit === 'volume' : false}
              />
              <label htmlFor="radio-volume">Volume</label>
            </li>

            <li>
              <input
                type="radio"
                name="quantityName"
                id="radio-mass"
                onChange={onChangeQuantityType.bind(null, item, 'mass')}
                checked={item.requireQuantityIn ? item.requireQuantityIn.unit === 'mass' : false}
              />
              <label htmlFor="radio-mass">Mass</label>
            </li>

            <li>
              <input
                type="radio"
                name="quantityName"
                id="radio-custom"
                onChange={onChangeQuantityType.bind(null, item, 'custom')}
                checked={item.requireQuantityIn ? item.requireQuantityIn.unit === 'custom' : false}
              />
              <label htmlFor="radio-custom">Custom</label>

              {/* Only show custom quantities when using a 'custom' type */}
              {item.requireQuantityIn && item.requireQuantityIn.unit === 'custom' ? <div className="content custom-quantity-tags">
                <ReactTags
                  tags={item.requireQuantityIn ? item.requireQuantityIn.customChoices.map(i => ({id: i, text: i})) : []}
                  handleAddition={onAddCustomQuantity.bind(null, item)}
                  handleDelete={onRemoveCustomQuantity.bind(null, item)}
                />
              </div>: null}
            </li>
          </ul>
        </div> : null}

        {/* Everything inside of a list is displayed in a grid */}
        {item.type === 'list' ? <ul className="pt-card pt-elevation-1 list-contents-grid">
          <li className="header">
            <span className="item-name">Name</span>
            <span className="item-quantity">Quantity</span>
            <span className="item-close"></span>
          </li>
          {item.contents.map((item, ct) => {
            return <ListItem
              key={item._id}
              item={item}
              
              onDelete={onDeleteItemFromList.bind(null, item._id)}
              onUpdateItemInList={onUpdateItemInList.bind(null, item._id)}
            />;
          })}

          {/* Add a new item to the specified list */}
          <AddNewSearchBox item={item} />
        </ul> : null}
      </div>

      {/* Add an image to the item */}
      <Dropzone
        onDrop={files => files.length && onDropImage(item, files[0])}
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

export function CustomPresetQuantity({
  item, // The item to adjust the preset quantitys for.
  onChange, // called when preset quantity changes. Called with (size, value).
}) {
  // Things have custom preset quantities
  if (item.type === 'item') {
    let quantityPresets = item.quantityPresets || {};
    return <div className="custom-quantity-presets pt-card pt-elevation-1">
      <div className="header">
        <img alt="Quantity Presets" src="images/quantities.png" />
        <h4>Preset quantities</h4>
      </div>

      <div className="content">
        <ul>
          {['small', 'medium', 'large'].map(size => {
            return <li key={size}>
              <img src={`images/${size}.png`} alt={size} />
              <input
                type="text"
                placeholder={`${size} quantity (eg, 1 cup)`}
                value={quantityPresets[size] || ''}
                onChange={({target: {value}}) => onChange(size, value)}
              />
            </li>
          })}
        </ul>
      </div>
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
		<QuantityPicker
			item={item}
      onChange={event => onUpdateItemInList(item._id, {quantity: event.target.value || '1'})}
		/>
    <span className="item-close" onClick={onDelete.bind(null, item)}>
      &times;
    </span>
  </li>;
}







export function mapStateToProps(state, props) {
  // if the route is /grocery, get the grocery list
  // TODO: probably a bettwr, more modular way to do this.
  let preselectedItem;
  if (props.location.pathname.startsWith('/grocery')) {
    preselectedItem = state.items.find(i => i.listType === 'grocery');
  } else if (props.location.pathname.startsWith('/pantry')) {
    preselectedItem = state.items.find(i => i.listType === 'pantry');
  }

  return {
    item: preselectedItem || getItemForId(state, props.routeParams.id),
    items: state.items,
  };
};

export function mapDispatchToProps(dispatch) {
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
		onChangeQuantityPreset(item, size, value) {
			dispatch(changeQuantityPreset(item, size, value));
		},
  };
};

// The default type of ItemDetail pulls from the :id in the route
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
