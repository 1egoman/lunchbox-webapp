import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function calculateList() {
  return dispatch => {
    dispatch({type: "CALC_LIST_REQUEST"});

    return fetch(`${HOSTNAME}/calc?token=${TOKEN}`, {
      headers: {
        // Authorization: `Bearer ${TOKEN}`,
      },
    }).then(resp => {
      if (resp.ok) {
        return resp.json().then(data => {
          dispatch({type: "CALC_LIST_SUCCESS", data});
        });
      } else {
        dispatch({type: "CALC_LIST_ERROR", code: resp.statusCode});
      }
    }).catch(error => dispatch(throwError(error)));
  };
}

