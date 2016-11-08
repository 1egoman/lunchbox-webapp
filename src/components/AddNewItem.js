import React from 'react';
import {connect} from 'react-redux';

import createNew from '../actions/createNew';
import updateNewItemStagingName from '../actions/updateNewItemStagingName';

export function AddNewItem({
  name,

  onCreateList,
  onCreateItem,
  onChangeNewItemStagingName,
}) {
  return <div className="add-new-item">
    <h1>Add a new item or list</h1>

    <input
      type="text"
      value={name}
      onChange={event => onChangeNewItemStagingName(event.target.value)}
      placeholder="Item or List name"
    />

    <button onClick={onCreateItem.bind(null, name)}>Item</button>
    <button onClick={onCreateList.bind(null, name)}>List</button>
  </div>;
}

export default connect(state => ({
  name: state.newItemStaging.name,
}), dispatch => ({
  onChangeNewItemStagingName(name) {
    dispatch(updateNewItemStagingName(name));
  },
  onCreateItem(name) {
    dispatch(createNew('item', name));
  },
  onCreateList(name) {
    dispatch(createNew('list', name));
  }
}))(AddNewItem);
