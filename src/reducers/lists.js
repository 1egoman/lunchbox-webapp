export default function items(state=[], action) {
  switch (action.type) {
    case "ALL_ITEMS_FETCH_SUCCESS": {
      return action.data;
    }
    // add the item to the list
    case "ADD_ITEM_TO_LIST_SUCCESS": {
      return state.map(item => {
        if (item.type === 'list' && action.listId === item._id) {
          return Object.assign({}, item, {
            contents: [...item.contents, action.item],
          });
        } else {
          return item;
        }
      })
    }

    default: {
      return state;
    }
  }
}
