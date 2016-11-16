export default function items(state=[], action) {
  switch (action.type) {
    case "ALL_ITEMS_FETCH_SUCCESS": {
      return action.data;
    }
    // add the item to the list
    // This is for an optimistic update
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

    // add the item to the list
    // This is for an optimistic update
    case "DELETE_ITEM_FROM_LIST_SUCCESS": {
      return state.map(item => {
        if (item.type === 'list' && action.listId === item._id) {
          return Object.assign({}, item, {
            contents: item.contents.filter(({_id}) => _id !== action.item._id),
          });
        } else {
          return item;
        }
      });
    }

    // WHen a user uploads a new image, change the item it was uploaded to
    // This is done so the item will rerender, re-pulling in the associated
    // image.
    case "IMAGE_UPLOAD_COMPLETE": {
      return state.map(item => {
        if (item.type === 'list' && action.itemId === item._id) {
          // make the view rerender and pull in the new image
          return Object.assign({}, item, {_cachebuster: (new Date().getTime())});
        } else {
          return item;
        }
      });
    }

    // Update a custom quanitity
    case 'CHANGE_CUSTOM_QUANTITY_SUCCESS': {
      return state.map(item => {
        if (item.type === 'list' && action.itemId === item._id) {
          return Object.assign({}, item, {
            requireQuantityIn: {
              unit: action.unit,
              customChoices: action.customChoices,
            },
          });
        } else {
          return item;
        }
      });
    }

    default: {
      return state;
    }
  }
}
