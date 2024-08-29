class Project {
    items = [];

    constructor(name) {
        this.name = name;
    }

    addToProject (data) {
        this.items.push(data);
    }

    getProject (index) {
        return this.items[index];
    }
}

export { Project }