import './index.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'

let currrentProject = 0; // Default Project
const projects = [];

loadProjectsFromLocalStorage();

function loadProjectsFromLocalStorage() {
    const projectsInLocalStorage = JSON.parse(localStorage.getItem("todo-list"));
    if (projectsInLocalStorage) {
        projectsInLocalStorage.forEach((element) => {
            const project = new Project(element.name);
            element.items.forEach(todo => {
                let task = new Todo(todo.title, todo.description, todo.dueDate, todo.priority, todo.completed, todo.notes);
                project.addToProject(task);
            })
            projects.push(project);
        })
    } else {
        const project = new Project("Default");
        projects.push(project);
    }
}

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
        const div = dom.createDiv();
        const projButton = dom.createButton();
        projButton.innerText = element.name;
        projButton.classList = 'project-btn';
        dom.bindEvent(projButton, 'click', () => loadTodosFromProject(index));
        div.appendChild(projButton);
        if (index !== 0) {
            const deleteProjetc = dom.createButton();
            deleteProjetc.innerHTML = `<i class="fa-solid fa-trash"></i>`;
            deleteProjetc.classList.add("delete-project")
            dom.bindEvent(deleteProjetc, 'click', () => deleteProjectFunc(projects, index));
            div.appendChild(deleteProjetc);
        }
        dom.sidebarContent.appendChild(div);
    })
}

function loadTodosFromProject(index) {
    currrentProject = index;
    dom.cleanElement();

    projects[index].items.forEach((element, taskIndex) => {
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

        dom.bindEvent(card, 'click', () => showTaskInfo(index, taskIndex));

        dom.contentTodos.appendChild(card);
    })
}

function addTask() {
    let data = dom.getFormInputs();
    let isDataValid = validateInputValues(data);
    if (isDataValid) {
        let todo = new Todo(data.title.value, data.description.value, data.dueDate.value, data.priority.value, data.completed, data.notes.value);
        projects[currrentProject].addToProject(todo);
        loadTodosFromProject(currrentProject);
        invalidFormSubmissionStyle(data, 'remove')
        cleanFormFields();
    } else {
        invalidFormSubmissionStyle(data, 'add');
        console.log('Erro!')
    }
    saveProjectsToLocalStorage(projects)
}

function dayMonthYear() {
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    if (month < 10) month = `0${month}`;
    let year = new Date().getFullYear()
    return `${year}-${month}-${day}`;
}

function cleanFormFields() {
    dom.form.reset()
}

function validateInputValues(data) {
    if (
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
            if (element[1].value === '') {
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
    const input = createNewProjectInput();
    dom.bindEvent(input, 'blur', () => {
        if (input.value === '') {
            dom.sidebarContent.removeChild(input);
        } else {
            const project = new Project(input.value);
            dom.sidebarContent.removeChild(input);
            projects.push(project);
            saveProjectsToLocalStorage(projects);
            dom.sidebarContent.replaceChildren();
            renderProjects();
            currrentProject = projects.length - 1;
            loadTodosFromProject(currrentProject);
        }
    })
}

function createNewProjectInput() {
    const input = dom.createInput();
    input.type = 'text';
    input.classList.add('input-project');
    dom.sidebarContent.appendChild(input);
    input.focus();
    return input;
}

function deleteProjectFunc(projects, index) {
    projects.splice(index, 1);
    dom.sidebarContent.replaceChildren();
    dom.contentTodos.replaceChildren();
    saveProjectsToLocalStorage(projects)
    renderProjects();
    currrentProject = 0;
}

function saveProjectsToLocalStorage() {
    const projectsJson = JSON.stringify(projects);
    localStorage.setItem("todo-list", projectsJson);
}

function showTaskInfo(index, taskIndex) {
    dom.btnAddTodo.style.display = 'none';

    const form = dom.createForm();

    Object.keys(projects[index].items[taskIndex]).forEach(element => {
        const label = dom.createLabel();
        label.innerText = `${element[0].toUpperCase()}${element.slice(1)}:`;
        form.appendChild(label);

        if (element !== "notes") {
            const input = dom.createInput();
            switch (element) {
                case "title":
                case "description":
                    input.type = "text";
                    break;
                case "dueDate":
                    input.type = "date";
                    input.min = dayMonthYear();
                    break;
                case "priority":
                    input.type = "number";
                    break;
                case "completed":
                    input.type = "checkbox";
                    break;
            }
            input.value = projects[index].items[taskIndex][element];
            form.appendChild(input);
        } else {
            const textArea = dom.createTextArea();
            form.appendChild(textArea);
        }
    })
    const submitForm = dom.createInput();
    submitForm.type = "submit";

    form.appendChild(submitForm);
    dom.contentTodos.replaceChildren(form);
}