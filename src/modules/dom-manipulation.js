const wrapper = document.querySelector('.wrapper');
const sidebarContent = document.querySelector('.sidebar-content');
const contentTodos = document.querySelector('.content-todos');
const btnAddProject = document.querySelector('.btn-add-project');
const btnAddTodo = document.querySelector('.btn-add-todo');
const dialog = document.querySelector('dialog');
const date = document.querySelector('input[type=date]');
const formSubmit = document.querySelector('input[type=submit]');

function createDiv() {
    const div = document.createElement('div');
    return div;
}

function createPhara() {
    const phara = document.createElement('p');
    return phara;
}

function createButton() {
    const button = document.createElement('button');
    return button;
}

function bindEvent(element, action, func) {
    return element.addEventListener(action, func)
}

function cleanElement() {
    return contentTodos.replaceChildren();
}

function getFormInputs() {
    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;
    const priority = document.querySelector('#priority').value;
    const completed = false;
    const notes = document.querySelector('#notes').value;

    return {title, description, dueDate, priority, completed, notes};
}


export { wrapper, sidebarContent, contentTodos, btnAddProject, btnAddTodo, dialog, date, formSubmit, createDiv, createPhara, createButton, bindEvent, cleanElement, getFormInputs }