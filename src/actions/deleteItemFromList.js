import {HOSTNAME} from '../constants';

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
        dispatch({
          type: "DELETE_ITEM_FROM_LIST_SUCCESS",
          listId,
          item,
        });
      } else {
        dispatch({
          type: "DELETE_ITEM_FROM_LIST_ERROR",
          code: resp.statusCode,
        });
      }
    });
  };
}
