export class Project {
    constructor(name = 'default') {
        this.name = name;
        this.list = [];
        projectInstances.addInstance(this);
    }

    // * Getters
    getName = () => this.name;
    getList = () => this.list;
    getLength = () => this.list.length;
    getTitles = () => this.list.map((todo) => todo.getName());
    getDueDates = () => this.list.map((todo) => todo.getDueDate());
    getPriorities = () => this.list.map((todo) => todo.getPriority());
    getNotes = () => this.list.map((todo) => todo.getNote());
    getCheckStatus = () => this.list.map((todo) => todo.getCheckStatus());
    getIds = () => this.list.map((todo) => todo.getId());

    // * Setters
    addNewTodo = (todo) => {
        // * check if project name is already set to todo
        if (todo.getProjectName() === this.getName()) {
            this.list.push(todo);
        } else {
            alert(`You have already a todo name's ${this.getName()}`);
        }
    };

    // todo filter?
    // removeItem = (item) => this.list.remove(this.list.getIds() === item.getId());
    removeTodo = (todo) => {
        this.list = this.list.filter((item) => item.getName() !== todo.getName());
    };
}

export const projectInstances = (() => {
    const instances = [];

    const getInstances = () => instances;
    const getNames = () => instances.map((project) => project.getName());
    const getLength = () => instances.length;

    const addInstance = (instance) => {
        // * check if instance name is already set to instances
        if (getNames().every((element) => element !== instance)) {
            instances.push(instance);
        }
    };

    const removeInstance = (instance) => {
        const index = getInstances().indexOf(
            projectInstances.getInstances().find((project) => project.getName() === instance.getName())
        );
        getInstances().splice(index, 1);
    };

    return { addInstance, getInstances, getNames, getLength, removeInstance };
})();
