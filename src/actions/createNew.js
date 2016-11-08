import {HOSTNAME} from '../constants';
import {push} from 'react-router-redux';
import fetchAllItems from './fetchAllItems';
import updateNewItemStagingName from './updateNewItemStagingName';

export default function createNew(itemType, name) {
  return dispatch => {
    dispatch({type: "CREATE_ITEM_REQUEST", itemType, name});
    fetch(`${HOSTNAME}/items`, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({name, type: itemType})
    }).then(resp => resp.json()).then(json => {
      if (json.status === 'ok') {
        dispatch({type: "CREATE_ITEM_SUCCESS", json});

        dispatch(fetchAllItems()); // fetch new items
        dispatch(push(`/items/${json.id}`)); // go to the new item
        dispatch(updateNewItemStagingName("")); // clear for adding future new items
      } else {
        dispatch({type: "CREATE_ITEM_ERROR", json});
      }
    });
  };
}
