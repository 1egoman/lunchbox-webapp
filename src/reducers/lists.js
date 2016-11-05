export default function createListReducer(type) {
  return function lists(state={}, action) {
    switch (action.type) {
      case "LIST_FETCH_SUCCESS": {
        if (action.data && action.data.listType === type) {
          return action.data;
        } else {
          return state;
        }
      }
      default: {
        return state;
      }
    }
  }
}
