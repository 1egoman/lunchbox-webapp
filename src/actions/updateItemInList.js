import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function updateItemInList(listId, itemId, data) {
  return dispatch => {
    dispatch({type: 'UPDATE_ITEM_IN_LIST_REQUEST', listId, itemId, data});
    return fetch(`${HOSTNAME}/lists/${listId}/contents/${itemId}?token=${TOKEN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(resp => resp.json()).then(json => {
      if (json.status === 'ok') {
        dispatch({type: 'UPDATE_ITEM_IN_LIST_SUCCESS', listId, itemId, data});
      }
    }).catch(error => dispatch(throwError(error)));
  };
}
