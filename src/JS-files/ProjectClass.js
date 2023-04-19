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
        // check if project name is already set to item
        if (item.getProjectNames().every((element) => element !== this.getName())) {
            item.setProjectName(this.getName());
            this.list.push(item);
        }
    };

    removeItem = (item) => this.list.remove(this.list.getIds() === item.getId());
}

export const projectInstances = (() => {
    const instances = [];

    const getInstances = () => instances;
    const getInstancesNames = () => instances.map((project) => project.getName());
    const getInstancesLength = () => instances.length;

    const addInstance = (instance) => {
        // check if instance name is already set to instances
        if (getInstancesNames().every((element) => element !== instance)) {
            instances.push(instance);
        }
    };

    return { addInstance, getInstances, getInstancesNames, getInstancesLength };
})();
