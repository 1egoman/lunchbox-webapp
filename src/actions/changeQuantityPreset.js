import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';
import throwError from './throwError';
import fetchPicks from './fetchPicks';

export default function changeQuantityPreset(item, size, value) {
  return dispatch => {
    dispatch({type: 'CHANGE_QUANTITY_PRESET_REQUEST', itemId: item._id, size, value});
    return fetch(`${HOSTNAME}/items/${item._id}?token=${TOKEN}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        quantityPresets: {
          ...item.quantityPresets,
          [size]: value,
        },
      }),
    }).then(resp => {
      if (resp.ok) {
        // An optimistic update
        dispatch({type: 'CHANGE_QUANTITY_PRESET_SUCCESS', itemId: item._id, size, value});
        // Get the truth from the server
        dispatch(fetchAllItems());
        // Lastly, update the calculated list
        dispatch(calculateList());
        // and the picks
        dispatch(fetchPicks());
      } else {
        return resp.json().then(data => {
          dispatch({type: 'CHANGE_QUANTITY_PRESET_ERROR', size, value});
        });
      }
    }).catch(error => dispatch(throwError(error)));
  }
}
