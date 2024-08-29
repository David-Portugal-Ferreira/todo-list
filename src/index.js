import './index.css'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'

let currrentProject = 0; // Default Project
const projects = [];
const defaultProject = new Project('Default');

dom.bindEvent(dom.btnAddProject, 'click', () => {
    alert('Add Project!');
})
dom.bindEvent(dom.btnAddTodo, 'click', () => {
    alert('Add Task!');
})

const todo1 = new Todo('teste', 'test', 'ded', 8, false, '');
const todo2 = new Todo('asdf', 'asdf', 'asdf', 13, false, 'asdf');
defaultProject.addToProject(todo1);
defaultProject.addToProject(todo2);
projects.push(defaultProject);







renderProjects();

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