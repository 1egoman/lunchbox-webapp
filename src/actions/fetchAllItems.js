import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function fetchAllLists(listType) {
  return dispatch => {
    dispatch({type: "ALL_ITEMS_FETCH_REQUEST"});

    return fetch(`${HOSTNAME}/items?token=${TOKEN}`).then(resp => {
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
    }).catch(error => dispatch(throwError(error)));
  };
}
