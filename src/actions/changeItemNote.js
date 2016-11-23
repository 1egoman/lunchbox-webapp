export default function changeItemNote(listId, itemId, data) {
  return {type: 'CHANGE_ITEM_NOTE', listId, itemId, data};
}
