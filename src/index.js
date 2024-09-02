import './index.css'
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import { Todo } from './modules/todos'
import { Project } from './modules/projects'
import * as dom from './modules/dom-manipulation'

// TODO - Pass everything related to dom manipulation to dom-manipulation.js
//        This includes, for exemple, adding id's to something

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
        dom.addClassList(projButton, 'project-btn', 'add');
        dom.bindEvent(projButton, 'click', () => loadTodosFromProject(index));
        div.appendChild(projButton);
        if (index !== 0) {
            const deleteProjetc = dom.createButton();

            deleteProjetc.innerHTML = `<i class="fa-solid fa-trash"></i>`;

            dom.addClassList(deleteProjetc, "delete-project", 'add');
            dom.bindEvent(deleteProjetc, 'click', () => deleteProjectFunc(projects, index));
            div.appendChild(deleteProjetc);
        }
        dom.sidebarContent.appendChild(div);
    })
}

function loadTodosFromProject(index) {
    currrentProject = index;
    dom.cleanTodosDiv();
    addTaskButtonVisibility('block');

    projects[index].items.forEach((element, taskIndex) => {
        const card = dom.createDiv();
        dom.addClassList(card, 'card', 'add');

        const cardHeader = dom.createDiv();
        dom.addClassList(cardHeader, 'card-header', 'add');
        const cardBody = dom.createDiv();
        dom.addClassList(cardBody, 'card-body', 'add');

        const title = dom.createPhara();
        title.innerText = `Title: ${element.title}`;
        dom.addClassList(title, 'card-title', 'add');
        cardHeader.appendChild(title);

        const priority = dom.createPhara();
        priority.innerText = `Priority: ${element.priority}`;
        dom.addClassList(priority, 'card-priority', 'add');
        cardHeader.appendChild(priority);

        card.appendChild(cardHeader);

        const dueDate = dom.createPhara();
        dueDate.innerText = `Due Date: ${element.dueDate}`;
        dom.addClassList(dueDate, 'card-duedate', 'add');
        cardBody.appendChild(dueDate)

        const completed = dom.createPhara();
        if (element.completed === true) {
            completed.innerText = 'Done';
            card.style['text-decoration-line'] = 'line-through';
        } else {
            completed.innerText = 'To do';
            card.style['text-decoration-line'] = 'none';
        }
        dom.addClassList(completed, 'card-completed', 'add');
        cardBody.appendChild(completed);

        card.appendChild(cardBody);

        cardBorderColorByPriority(element.priority, card);

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
        dom.dialog.close();
    } else {
        invalidFormSubmissionStyle(data, 'add');
        console.log('Erro!')
    }
    saveProjectsToLocalStorage(projects)
}

function dayMonthYear() {
    let day = new Date().getDate();
    if (day < 10) day = `0${day}`
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
        (data.title.value === '' || data.title.valuelength > 15) ||
        data.description.value === '' ||
        data.dueDate.value === '' ||
        (data.priority.value === '' || +data.priority.value < 1 || +data.priority.value > 5) ||
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
                dom.addClassList(element[1], 'invalid-input', action);
            }
        })
    }
    if (action === 'remove') {
        Object.entries(data).forEach((element) => {
            if (element[0] === 'notes' || element[0] === 'completed') return;
            dom.addClassList(element[1], 'invalid-input', action);
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
    dom.addClassList(input, 'input-project', 'add');
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

function addTaskButtonVisibility(action) {
    dom.btnAddTodo.style.display = action;
}

function showTaskInfo(index, taskIndex) {
    addTaskButtonVisibility("none");

    const form = dom.createForm();
    form.id = "change-task";

    Object.keys(projects[index].items[taskIndex]).forEach(element => {
        const label = dom.createLabel();
        label.innerText = `${element[0].toUpperCase()}${element.slice(1)}:`;
        form.appendChild(label);

        if (element !== "notes") {
            const input = dom.createInput();
            switch (element) {
                case "title":
                    input.type = "text";
                    input.id = "title";
                    break;
                case "description":
                    input.type = "text";
                    input.id = "description";
                    break;
                case "dueDate":
                    input.type = "date";
                    input.min = dayMonthYear();
                    input.id = "dueDate";
                    break;
                case "priority":
                    input.type = "number";
                    input.id = "priority";
                    break;
                case "completed":
                    input.type = "checkbox";
                    input.id = "completed"
                    if (projects[index].items[taskIndex][element]) {
                        input.checked = true;
                    }
                    break;
            }
            input.value = projects[index].items[taskIndex][element];
            form.appendChild(input);
        } else {
            const textArea = dom.createTextArea();
            textArea.id = "notes";
            textArea.value = projects[index].items[taskIndex][element];
            form.appendChild(textArea);
        }
    });

    const actionsDiv = dom.createDiv();

    const submitForm = dom.createInput();
    submitForm.type = "submit";
    dom.bindEvent(submitForm, 'click', (e) => submitNewTodoValues(e, index, taskIndex, form));
    actionsDiv.appendChild(submitForm);

    const deleteTodo = dom.createButton();
    deleteTodo.type = 'button';
    deleteTodo.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    dom.bindEvent(deleteTodo, 'click', () => deleteTask(index, taskIndex, form));

    actionsDiv.appendChild(deleteTodo);
    form.appendChild(actionsDiv);
    dom.contentTodos.replaceChildren(form);
}

function submitNewTodoValues(e, index, taskIndex, form) {
    e.preventDefault();
    const data = dom.getFormInputs();
    let isDataValid = validateInputValues(data);
    if (isDataValid) {
        for (const element in data) {
            if (element === 'completed') {
                projects[index].items[taskIndex].changeProperty(element, data[element].checked);
                continue;
            }
            projects[index].items[taskIndex].changeProperty(element, data[element].value);
        }
    } else {
        invalidFormSubmissionStyle(data, 'add');
        return;
    }

    addTaskButtonVisibility('block');
    form.style.display = 'none';

    saveProjectsToLocalStorage();
}

function deleteTask(index, taskIndex, form) {
    projects[index].items.splice(taskIndex, 1);
    addTaskButtonVisibility('block');
    form.style.display = 'none';
    saveProjectsToLocalStorage();
}

function cardBorderColorByPriority(priority, card) {
    switch (priority) {
        case "1":
            dom.addClassList(card, 'card-lowerpriority', "add");
            break;
        case "2":
            dom.addClassList(card, 'card-lowpriority', "add");
            break;
        case "3":
            dom.addClassList(card, 'card-medium-priority', "add");
            break;
        case "4":
            dom.addClassList(card, 'card-high-priority', "add");
            break;
        case "5":
            dom.addClassList(card, 'card-veryhigh-priority', "add");
            break;
    }
}