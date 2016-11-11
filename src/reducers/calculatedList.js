export default function calculatedList(state=[], action) {
  switch (action.type) {
    case 'CALC_LIST_SUCCESS': {
      return action.data;
    }
    default: {
      return state;
    }
  }
}
