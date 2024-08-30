import './index.css'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'

let currrentProject = 0; // Default Project
const projects = [];
const defaultProject = new Project('Default');
projects.push(defaultProject);


renderProjects();

dom.bindEvent(dom.btnAddProject, 'click', () => {
    createNewProject();
});
dom.bindEvent(dom.btnAddTodo, 'click', () => {
    dom.dialog.showModal();
    dom.date.setAttribute('min', dayMonthYear());
});
dom.bindEvent(dom.formSubmit, 'click', (e) => {
    e.preventDefault();
    addTask();
});
dom.bindEvent(dom.formCloseBtn, 'click', () => {
    cleanFormFields();
    dom.dialog.close()
    const data = dom.getFormInputs();
    invalidFormSubmissionStyle(data, 'remove');
});


function renderProjects() {
    projects.forEach((element, index) => {
        let projButton = dom.createButton();
        projButton.innerText = element.name;
        projButton.classList = 'project-btn';
        elementEvent(projButton, 'click', () => loadTodosFromProject(index));
        dom.sidebarContent.appendChild(projButton);
    })
}

function elementEvent(element, action, func) {
    dom.bindEvent(element, action, func);
}

function loadTodosFromProject(index) {
    currrentProject = index;
    dom.cleanElement();

    projects[index].items.forEach(element => {
        const card = dom.createDiv();
        card.classList = 'card'

        const title = dom.createPhara();
        title.innerText = element.title;
        title.classList = 'card-title'
        card.appendChild(title)

        const dueDate = dom.createPhara();
        dueDate.innerText = element.dueDate;
        dueDate.classList = 'card-duedate';
        card.appendChild(dueDate)

        const priority = dom.createPhara();
        priority.innerText = element.priority;
        priority.classList = 'card-priority';
        card.appendChild(priority)

        const completed = dom.createPhara();
        completed.innerText = element.completed;
        completed.classList = 'card-completed';
        card.appendChild(completed)

        dom.contentTodos.appendChild(card);
    })
}

function addTask() {
    let data = dom.getFormInputs();
    let isDataValid = validateInputValues(data);
    if(isDataValid) {
        let todo = new Todo(data.title.value, data.description.value, data.dueDate.value, data.priority.value, data.completed, data.notes.value); 
        projects[currrentProject].addToProject(todo);
        loadTodosFromProject(currrentProject);
        invalidFormSubmissionStyle(data, 'remove')
        cleanFormFields();
    } else {
        invalidFormSubmissionStyle(data, 'add');
        console.log('Erro!')
    }
}

function dayMonthYear() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    if(month < 10) month = `0${month}`;
    let year = new Date().getFullYear()
    return `${year}-${month}-${day}`;
}

function cleanFormFields() {
    dom.form.reset()
}

function validateInputValues(data) {
    if(
        data.title.value === '' ||
        data.description.value === '' ||
        data.dueDate.value === '' ||
        data.priority.value === '' ||
        data.description.value === ''
    ) {
        return false
    }
    return true
}

function invalidFormSubmissionStyle(data, action) {
    if (action === 'add') {
        Object.entries(data).forEach((element) => {
            if (element[0] === 'notes' || element[0] === 'completed') return;
            if(element[1].value === '') {
                element[1].classList[action]('invalid-input');
            }
        })
    }
    if (action === 'remove') {
        Object.entries(data).forEach((element) => {
            if (element[0] === 'notes' || element[0] === 'completed') return;
            element[1].classList[action]('invalid-input');
        })
    }
}

function createNewProject() {
    const input = createInput();
    dom.bindEvent(input, 'blur', () => {
        if(input.value === '') {
            dom.sidebarContent.removeChild(input);
        } else {
            const project = new Project(input.value);
            dom.sidebarContent.removeChild(input);
            projects.push(project);
            dom.sidebarContent.replaceChildren();
            renderProjects();
            currrentProject = projects.length - 1;
            loadTodosFromProject(currrentProject);
        }
    })
}

function createInput() {
    const input = dom.createInput();
    input.type = 'text';
    input.classList.add('input-project');
    dom.sidebarContent.appendChild(input);
    input.focus();
    return input;
}