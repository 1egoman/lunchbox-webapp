import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';

export default function changeCustomQuantity(item, unit, customChoices=[]) {
  return dispatch => {
    dispatch({type: 'CHANGE_CUSTOM_QUANTITY_REQUEST', itemId: item._id, unit, customChoices});
    fetch(`${HOSTNAME}/items/${item._id}?token=${TOKEN}`, {
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
      } else {
        return resp.json().then(data => {
          dispatch({type: 'CHANGE_CUSTOM_QUANTITY_ERROR', itemId: item._id, data});
        });
      }
    });
  }
}
