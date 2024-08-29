const wrapper = document.querySelector('.wrapper');
const sidebarContent = document.querySelector('.sidebar-content');
const contentTodos = document.querySelector('.content-todos');

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

function bindEvent (element, action, func) {
    return element.addEventListener(action, func)
}

function cleanElement() {
    return contentTodos.replaceChildren();
}





export { wrapper, sidebarContent, contentTodos, createDiv, createPhara, createButton, bindEvent, cleanElement }