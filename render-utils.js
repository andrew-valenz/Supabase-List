export function renderListItem(itemObject) {
    const listItemEl = document.createElement('li');
    listItemEl.textContent = `${itemObject.quantity} ${itemObject.item}`;

    return listItemEl;
}
