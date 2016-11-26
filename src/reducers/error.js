export default function errors(state=null, action) {
  switch (action.type) {
    case 'DISMISS_ERROR': {
      return null;
    }
    case 'THROW_ERROR': {
      return action.error;
    }
    default: {
      return state;
    }
  }
}
