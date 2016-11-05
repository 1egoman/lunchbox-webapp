
// Given a list of all items and an item id, find a item with the given id.
export default function getItemForId(state, _id) {
  return state.items.find(item => {
    return item._id === _id;
  });
}
