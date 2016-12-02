export default function remoteRecipes(state=[], action) {
  switch (action.type) {
    case 'FETCH_REMOTE_RECIPES_SUCCESS': {
      return action.data;
    }
    case 'RESET_REMOTE_RECIPES': {
      return [];
    }
    default: {
      return state;
    }
  }
}
