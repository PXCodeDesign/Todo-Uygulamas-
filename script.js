// UI vars


const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


//load items
loadItems();

eventListeners();

function eventListeners() {
    //submit event
    form.addEventListener('submit', addNewItem);

    //delete an item
    taskList.addEventListener('click', deleteItem);

    //delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {

    items = getItemsFromLS();

    items.forEach(function (item) {
        createItem(item);
    });
}

function getItemsFromLS() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {


    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a')
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fa fa-times"></i>';


    li.appendChild(a);

    taskList.appendChild(li);
}

function addNewItem(e) {
    if (input.value === '') {
        alert('add new item');
    }
    createItem(input.value);

    setItemToLS(input.value);

    input.value = '';

    e.preventDefault();
}


//delete an item
function deleteItem(e) {
    if (e.target.className === 'fa fa-times') {
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            deleteItemFromLS(e.target.parentElement.parentElement.textContent);

        }

    }

    e.preventDefault();
}


// delete all ıtems
function deleteAllItems() {

    if (confirm('are you sure ?')) {
        //taskList.innerHTML='';

        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }

    e.preventDefault();
}