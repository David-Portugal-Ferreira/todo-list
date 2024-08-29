import './index.css'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'


const projects = [];
const defaultProject = new Project('Default');



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
        elementEvent(projButton, 'click', () => alert('clicou' + index));
        dom.sidebarContent.appendChild(projButton);
    })
}

function elementEvent(element, action, func) {
    dom.bindEvent(element, action, func);
}