import {HOSTNAME} from '../constants';

export default function calculateList() {
  return dispatch => {
    dispatch({type: "CALC_LIST_REQUEST"});

    fetch(`${HOSTNAME}/calc`, {
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
    });
  };
}

