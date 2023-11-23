export class Project {
    constructor(name = 'default') {
        this.name = name;
        this.list = [];
    }

    // * Getters
    getList = () => this.list;
    getLength = () => this.list.length;
    getTitles = () => this.list.map((todo) => todo.name);
    getDueDates = () => this.list.map((todo) => todo.getDueDate());
    getPriorities = () => this.list.map((todo) => todo.getPriority());
    getNotes = () => this.list.map((todo) => todo.getNote());
    getCheckStatus = () => this.list.map((todo) => todo.getCheckStatus());
    getIds = () => this.list.map((todo) => todo.getId());

    // * Setters
    addNewTodo = (todo) => {
        if (this.list.every((item) => todo.name !== item.name)) {
            this.list.push(todo);
        }
    };

    removeTodo = (todo) => {
        this.list = this.list.filter((item) => item.name !== todo.name);
    };

    toJSON = () => {
        return {
            name: this.name,
            list: this.list.map((todo) => ({
                name: todo.name,
                description: todo.description,
                date: todo.dueDate,
                priority: todo.priority,
                projectName: todo.projectName,
            })),
        };
    };
}

export const projectInstances = (() => {
    let instances = [];
    let projectNames = [];

    const getInstances = () => instances;
    const getLength = () => projectNames.length;

    const addInstance = (instance) => {
        // * check if instance name is already set to instances
        if (!projectNames.includes(instance.name)) {
            instances.push(instance);
            projectNames.push(instance.name);
        }
    };

    const removeInstance = (instance) => {
        instances = projectInstances.getInstances().filter((project) => project.name !== instance.name);
        projectNames = projectNames.filter((projectName) => projectName !== instance.name);
    };

    return { getInstances, addInstance, instances, getLength, removeInstance };
})();
