import {HOSTNAME} from '../constants';
import fetchAllItems from './fetchAllItems';

export default function deleteItemFromList(listId, item) {
  return dispatch => {
    dispatch({type: "DELETE_ITEM_FROM_LIST_REQUEST", listId, item});

    fetch(`${HOSTNAME}/lists/${listId}/contents/${item._id}`, {
      method: 'DELETE',
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    }).then(resp => {
      if (resp.ok) {
        // An optimistic update
        dispatch({
          type: "DELETE_ITEM_FROM_LIST_SUCCESS",
          listId,
          item,
        });

        // Get the truth from the server
        dispatch(fetchAllItems());
      } else {
        dispatch({
          type: "DELETE_ITEM_FROM_LIST_ERROR",
          code: resp.statusCode,
        });
      }
    });
  };
}
