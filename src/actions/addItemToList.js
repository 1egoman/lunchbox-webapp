import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';

export default function addItemToList(listId, item, quantity) {
  return dispatch => {
    dispatch({type: "ADD_ITEM_TO_LIST_REQUEST", listId, item});

    fetch(`${HOSTNAME}/lists/${listId}/contents?token=${TOKEN}`, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item: item._id, quantity}),
    }).then(resp => {
      if (resp.ok) {
        return resp.json().then(({data}) => {
          // An optimistic update
          dispatch({
            type: "ADD_ITEM_TO_LIST_SUCCESS",
            listId, item, data, quantity,
          });

          // Get the truth from the server
          dispatch(fetchAllItems());

          // Lastly, update the calculated list
          dispatch(calculateList());
        });
      } else {
        dispatch({type: "ADD_ITEM_TO_LIST_ERROR", code: resp.statusCode});
      }
    });
  };
}