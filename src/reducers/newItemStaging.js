export default function autocompleteValue(state={name: ""}, action) {
  switch (action.type) {
    case "UPDATE_NEW_ITEM_STAGING_NAME": {
      return Object.assign({}, state, {name: action.name});
    }
    default: {
      return state;
    }
  }
}
