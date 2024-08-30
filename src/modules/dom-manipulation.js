import './dom.css';

const wrapper = document.querySelector('.wrapper');
const sidebarContent = document.querySelector('.sidebar-content');
const sidebarContentButtons = document.querySelectorAll('.sidebar-content > button');
const contentTodos = document.querySelector('.content-todos');
const btnAddProject = document.querySelector('.btn-add-project');
const btnAddTodo = document.querySelector('.btn-add-todo');
const dialog = document.querySelector('dialog');
const form = document.querySelector('form');
const date = document.querySelector('input[type=date]');
const formSubmit = document.querySelector('input[type=submit]');
const formCloseBtn = document.querySelector('dialog > button');

function disableSidebarButtons() {
    sidebarContentButtons.forEach(element => {
        element.disabled = true;
    })
}

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

function cleanTodosDiv() {
    return contentTodos.replaceChildren();
}

function getFormInputs() {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    const dueDate = document.querySelector('#dueDate');
    const priority = document.querySelector('#priority');
    const completed = false;
    const notes = document.querySelector('#notes');

    return {title, description, dueDate, priority, completed, notes};
}

function invalidField() {
    return 'invalid-input';
}

function createInput() {
    const input = document.createElement('input');
    return input;
}

function createForm() {
    const form = document.createElement('form');
    return form;
}

function createLabel() {
    const label = document.createElement('label');
    return label;
}

function createTextArea() {
    const textArea = document.createElement('textarea');
    return textArea;
}


export { 
    wrapper, 
    sidebarContent,
    contentTodos, 
    btnAddProject, 
    btnAddTodo, 
    dialog, 
    form, 
    date, 
    formSubmit, 
    formCloseBtn,
    disableSidebarButtons,
    createDiv, 
    createPhara, 
    createButton, 
    bindEvent, 
    cleanTodosDiv, 
    getFormInputs, 
    invalidField, 
    createInput, 
    createForm, 
    createLabel,
    createTextArea,
}