import { projectInstances } from './ProjectClass';

export class ToDoItem {
    constructor(
        title = null,
        description = null,
        dueDate = null,
        priority = null,
        comment = null,
        checkStatus = false
        // id = null
        // projectNames = 'default'
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.comment = comment;
        this.checkStatus = checkStatus;
        this.Id = null;
        this.projectNames = ['default'];

        this.setId();

        const defaultProject = projectInstances
            .getInstances()
            .find((project) => project.getName() === 'default');

        defaultProject.addNewItem(this);
    }

    //Getters
    getTitle = () => this.title;
    getDescription = () => this.description;
    getDueDate = () => this.dueDate;
    getPriority = () => this.priority;
    getComment = () => this.comment;
    getCheckStatus = () => this.checkStatus;
    getId = () => this.id;
    getProjectNames = () => this.projectNames;

    //Setters
    setDescription = (text) => (this.description = text);
    setDueDate = (date) => (this.dueDate = date);
    setPriority = (level) => (this.priority = level);
    setComment = (text) => (this.comment = text);
    setCheckStatus = (boolean) => (this.checkStatus = boolean);
    setId = () => (this.id = Date.now());
    setProjectName = (projectName) => this.projectNames.push(projectName);
}
