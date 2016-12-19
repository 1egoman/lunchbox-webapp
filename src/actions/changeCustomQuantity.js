import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';
import throwError from './throwError';
import fetchPicks from './fetchPicks';

export default function changeCustomQuantity(item, unit, customChoices=[]) {
  return dispatch => {
    dispatch({type: 'CHANGE_CUSTOM_QUANTITY_REQUEST', itemId: item._id, unit, customChoices});
    return fetch(`${HOSTNAME}/items/${item._id}?token=${TOKEN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        requireQuantityIn: {unit, customChoices},
      }),
    }).then(resp => {
      if (resp.ok) {
        // An optimistic update
        dispatch({type: 'CHANGE_CUSTOM_QUANTITY_SUCCESS', itemId: item._id, unit, customChoices});
        // Get the truth from the server
        dispatch(fetchAllItems());
        // Lastly, update the calculated list
        dispatch(calculateList());
        // and the picks
        dispatch(fetchPicks());
      } else {
        return resp.json().then(data => {
          dispatch({type: 'CHANGE_CUSTOM_QUANTITY_ERROR', itemId: item._id, data});
        });
      }
    }).catch(error => dispatch(throwError(error)));
  }
}
