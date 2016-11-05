import {HOSTNAME} from '../constants';

export default function fetchList(listType) {
  return dispatch => {
    dispatch({type: "LIST_FETCH_REQUEST", listType});

    fetch(`${HOSTNAME}/lists/${listType}`, {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    }).then(resp => {
      if (resp.ok) {
        return resp.json().then(data => {
          dispatch({
            type: "LIST_FETCH_SUCCESS",
            listType,
            data,
          });
        });
      } else {
        dispatch({type: "LIST_FETCH_ERROR", listType, code: resp.statusCode});
      }
    });
  };
}
