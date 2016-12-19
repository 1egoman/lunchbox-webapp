import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';
import throwError from './throwError';
import fetchPicks from './fetchPicks';

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
        // an optimistic update
        dispatch({type: 'UPDATE_ITEM_IN_LIST_SUCCESS', listId, itemId, data});

        // Get the truth from the server
        dispatch(fetchAllItems());

        // Lastly, update the calculated list
        dispatch(calculateList());
        // and the picks
        dispatch(fetchPicks());
      }
    }).catch(error => dispatch(throwError(error)));
  };
}
