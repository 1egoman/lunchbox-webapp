import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function fetchList(listType) {
  return dispatch => {
    dispatch({type: "LIST_FETCH_REQUEST", listType});

    return fetch(`${HOSTNAME}/lists/${listType}?token=${TOKEN}`).then(resp => {
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
    }).catch(error => dispatch(throwError(error)));
  };
}
