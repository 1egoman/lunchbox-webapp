export function createListReducer(type) {
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

export default function items(state=[], action) {
  switch (action.type) {
    case "ALL_ITEMS_FETCH_SUCCESS": {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
