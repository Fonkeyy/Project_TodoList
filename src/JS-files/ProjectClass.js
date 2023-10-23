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
    getTitles = () => this.list.map((item) => item.getTitle());
    getDueDates = () => this.list.map((item) => item.getDueDate());
    getPriorities = () => this.list.map((item) => item.getPriority());
    getNotes = () => this.list.map((item) => item.getNote());
    getCheckStatus = () => this.list.map((item) => item.getCheckStatus());
    getIds = () => this.list.map((item) => item.getId());

    // * Setters
    addNewItem = (item) => {
        // * check if project name is already set to item
        if (item.getProjectNames().every((element) => element !== this.getName())) {
            item.setProjectName(this.getName());
        }
        this.list.push(item);
    };

    // todo filter?
    removeItem = (item) => this.list.remove(this.list.getIds() === item.getId());
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
