export default function picks(state=[], action) {
  switch (action.type) {
    case "PICK_FETCH_SUCCESS": {
      return action.data;
    }

    default: {
      return state;
    }
  }
}
