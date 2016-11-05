import {HOSTNAME} from '../constants';

export default function fetchAllLists(listType) {
  return dispatch => {
    dispatch({type: "ALL_ITEMS_FETCH_REQUEST"});

    fetch(`${HOSTNAME}/items`, {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    }).then(resp => {
      if (resp.ok) {
        return resp.json().then(({data}) => {
          dispatch({
            type: "ALL_ITEMS_FETCH_SUCCESS",
            listType,
            data,
          });
        });
      } else {
        dispatch({type: "ALL_ITEMS_FETCH_ERROR", listType, code: resp.statusCode});
      }
    });
  };
}
