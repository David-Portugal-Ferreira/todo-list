class Todo {
    constructor(title, description, dueDate, priority, completed, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.notes = notes;
    }

    todoInfo () {
        return {
            title: this.title,
            description: this.description,
            dueDate: this.dueDate,
            priority: this.priority,
            completed: this.completed,
            notes: this.notes
        }
    }

    changeCompleted () {
        this.completed = !this.completed;
    }

    changeProperty (key, value) {
        this[key] = value;
    }
}

export { Todo }