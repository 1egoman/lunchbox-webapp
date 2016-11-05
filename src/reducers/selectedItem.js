export default function selectedItem(state=null, action) {
  switch (action.type) {
    case "SWITCH_ACTIVE_ITEM": {
      return action.id;
    }
    default: {
      return state;
    }
  }
}
