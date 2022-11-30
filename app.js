/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { renderListItem } from './render-utils.js';
import { getListItems, createListItem, editListItem, deleteList } from './fetch-utils.js';
/* Get DOM Elements */
const form = document.querySelector('.create-form');
const deleteButton = document.querySelector('#delete');
const listEl = document.querySelector('.list');
const error = document.querySelector('#error');
/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplayList();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const item = data.get('item');
    const quantity = data.get('quantity');
    form.reset();

    const newItem = await createListItem(item, quantity);
    if (newItem) {
        fetchAndDisplayList();
    } else {
        error.textContent = 'Something went wrong while adding your item';
    }
});

/* Display Functions */
async function fetchAndDisplayList() {
    listEl.textContent = '';
    const list = await getListItems();
    if (list) {
        for (let item of list) {
            const listItemEl = renderListItem(item);
            listItemEl.addEventListener('click', async () => {
                await editListItem(item);
                await fetchAndDisplayList();
            });
            if (item.cross_out) {
                listItemEl.classList.add('cross-out-true');
            }
            listEl.append(listItemEl);
        }
    }
}

deleteButton.addEventListener('click', async () => {
    await deleteList();
    await fetchAndDisplayList();
});
