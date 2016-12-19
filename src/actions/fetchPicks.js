import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function fetchPicks() {
  return dispatch => {
    dispatch({type: "PICK_FETCH_REQUEST"});

    return fetch(`${HOSTNAME}/match-recipes?token=${TOKEN}`).then(resp => {
      if (resp.ok) {
        return resp.json().then(data => {
          dispatch({
            type: "PICK_FETCH_SUCCESS",
            data: data.recipes,
          });
        });
      } else {
        dispatch({type: "PICK_FETCH_ERROR", code: resp.statusCode});
      }
    }).catch(error => dispatch(throwError(error)));
  };
}
