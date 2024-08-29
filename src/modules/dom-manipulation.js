const wrapper = document.querySelector('.wrapper');
const sidebarContent = document.querySelector('.sidebar-content');
const content = document.querySelector('.content');

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






export { wrapper, sidebarContent, content, createDiv, createPhara, createButton, bindEvent }