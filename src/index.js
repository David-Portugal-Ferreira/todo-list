import './index.css'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'


const projects = [];
const defaultProject = new Project('Default');
const todo1 = new Todo('teste', 'test', 'ded', 8, false, '');
const todo2 = new Todo('asdf', 'asdf', 'asdf', 13, false, 'asdf');
defaultProject.addToProject(todo1);
defaultProject.addToProject(todo2);
projects.push(defaultProject);

const defaultProject2 = new Project('Default');
projects.push(defaultProject2);

const defaultProject3 = new Project('Default');
projects.push(defaultProject3);

console.log(projects)





renderProjects();

function renderProjects() {
    projects.forEach((element, index) => {
        let projButton = dom.createButton();
        projButton.innerText = element.name;
        elementEvent(projButton, 'click', () => loadTodosFromProject(index));
        dom.sidebarContent.appendChild(projButton);
    })
}

function elementEvent(element, action, func) {
    dom.bindEvent(element, action, func);
}

function loadTodosFromProject(index) {
    dom.cleanElement();

    projects[index].items.forEach(element => {
        const card = dom.createDiv();

        const title = dom.createPhara();
        title.innerText = element.title;
        card.appendChild(title)

        const description = dom.createPhara();
        description.innerText = element.description;
        card.appendChild(description)

        const dueDate = dom.createPhara();
        dueDate.innerText = element.dueDate;
        card.appendChild(dueDate)

        const priority = dom.createPhara();
        priority.innerText = element.priority;
        card.appendChild(priority)

        const completed = dom.createPhara();
        completed.innerText = element.completed;
        card.appendChild(completed)

        const notes = dom.createPhara();
        notes.innerText = element.notes;
        card.appendChild(notes)

        dom.contentTodos.appendChild(card);
    })
}