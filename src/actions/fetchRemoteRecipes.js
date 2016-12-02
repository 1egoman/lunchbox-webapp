import {HOSTNAME, TOKEN} from '../constants';
import throwError from './throwError';

export default function fetchRemoteRecipes(data, page=1, hasIngredients=[]) {
  return dispatch => {
    // Fetch from the recipepuppy api
    dispatch({type: 'FETCH_REMOTE_RECIPES_REQUEST'});
    return fetch(
      `${HOSTNAME}/remote-recipes/?i=${hasIngredients.join(',')}&q=${data}&p=${page}&token=${TOKEN}`
    ).then(response =>  {
      if (response.ok) {
        return response.json();
      } else {
        return response.statusText;
      }
    }).then(data => {
      if (data.results && data.results.length) {
        dispatch({type: 'FETCH_REMOTE_RECIPES_SUCCESS', data: data.results.map(r => {
          // Format recipes so they can be distinguished from normal recipes
          return Object.assign({}, r, {
            type: 'list',
            listType: 'recipe',
            isRemoteRecipe: true,
            ingredients: r.ingredients.split(', '),
          });
        })});
      } else {
        dispatch({type: 'FETCH_REMOTE_RECIPES_ERROR', error: data});
      }
    }).catch(error => dispatch(throwError(error)));
  };
}
