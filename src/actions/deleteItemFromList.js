import {HOSTNAME, TOKEN} from '../constants';
import fetchAllItems from './fetchAllItems';
import calculateList from './calculateList';
import throwError from './throwError';

export default function deleteItemFromList(listId, item) {
  return dispatch => {
    dispatch({type: "DELETE_ITEM_FROM_LIST_REQUEST", listId, item});

    return fetch(`${HOSTNAME}/lists/${listId}/contents/${item._id}?token=${TOKEN}`, {
      method: 'DELETE',
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

        // Lastly, update the calculated list
        dispatch(calculateList());
      } else {
        dispatch({
          type: "DELETE_ITEM_FROM_LIST_ERROR",
          code: resp.statusCode,
        });
        dispatch(throwError(`Couldn't delete item ${item._id} from list ${listId}`));
      }
    }).catch(error => dispatch(throwError(error)));
  };
}
