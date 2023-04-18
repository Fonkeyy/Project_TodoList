export class Project {
    constructor(name = 'default') {
        this.name = name;
        this.list = [];
        projectInstances.addInstance(this);
    }

    //Getters
    getName = () => this.name;
    getList = () => this.list;
    getLength = () => this.list.length;
    getTitles = () => this.list.map((item) => item.getTitle());
    getDueDates = () => this.list.map((item) => item.getDueDate());
    getPriorities = () => this.list.map((item) => item.getPriority());
    getNotes = () => this.list.map((item) => item.getNote());
    getCheckStatus = () => this.list.map((item) => item.getCheckStatus());
    getIds = () => this.list.map((item) => item.getId());

    //Setters
    addNewItem = (item) => {
        item.setProjectName(this.getName());
        this.list.push(item);
    };
    removeItem = (id) => this.list.remove(this.list.getIds() === id);
}

export const projectInstances = (() => {
    const instances = [];

    const getInstances = () => instances;
    const addInstance = (instance) => instances.push(instance);
    const getInstancesNames = () => instances.map((project) => project.getName());
    const getInstancesLength = () => instances.length;

    return { addInstance, getInstances, getInstancesNames, getInstancesLength };
})();
