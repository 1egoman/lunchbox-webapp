export default function autocompleteValue(state="", action) {
  switch (action.type) {
    case "UPDATE_AUTOCOMPLETE": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
