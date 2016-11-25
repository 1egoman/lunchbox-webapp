export default function calulatedListMetadata(state={}, action) {
  switch (action.type) {
    case 'CHECK_CALCULATED_ITEM': {
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id] || {}, {checked: true}),
      });
    }
    case 'UNCHECK_CALCULATED_ITEM': {
      return Object.assign({}, state, {
        [action.id]: Object.assign({}, state[action.id] || {}, {checked: false}),
      });
    }
    default: {
      return state;
    }
  }
}
