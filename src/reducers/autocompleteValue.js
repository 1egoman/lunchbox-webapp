export default function autocompleteValue(state={data: "", quantity: ""}, action) {
  switch (action.type) {
    case "UPDATE_AUTOCOMPLETE": {
      return Object.assign({}, state, {data: action.data});
    }
    case "UPDATE_QUANTITY": {
      return Object.assign({}, state, {quantity: action.data});
    }
    default: {
      return state;
    }
  }
}
