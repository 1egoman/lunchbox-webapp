import {HOSTNAME} from '../constants';

export default function addItemToList(listId, item) {
  return dispatch => {
    dispatch({type: "ADD_ITEM_TO_LIST_REQUEST", listId, item});

    fetch(`${HOSTNAME}/lists/${listId}/contents`, {
      method: 'POST',
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({item: item._id, quantity: '1 cup'}),
    }).then(resp => {
      if (resp.ok) {
        return resp.json().then(({data}) => {
          dispatch({
            type: "ADD_ITEM_TO_LIST_SUCCESS",
            listId, item, data,
          });
        });
      } else {
        dispatch({type: "ADD_ITEM_TO_LIST_ERROR", code: resp.statusCode});
      }
    });
  };
}
