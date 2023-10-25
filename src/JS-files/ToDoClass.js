import { projectInstances } from './ProjectClass';

export class ToDoItem {
    constructor(
        title = null,
        description = null,
        dueDate = null,
        priority = null,
        projectName = null,
        comment = null,
        checkStatus = false
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectName = projectName;
        this.comment = comment;
        this.checkStatus = checkStatus;
        this.Id = null;
        this.projectNames = [projectName];

        this.setId();

        const project = projectInstances.getInstances().find((project) => project.getName() === projectName);

        project.addNewItem(this);
    }

    // * Getters
    getTitle = () => this.title;
    getDescription = () => this.description;
    getDueDate = () => this.dueDate;
    getPriority = () => this.priority;
    getProjectName = () => this.projectName;
    getComment = () => this.comment;
    getCheckStatus = () => this.checkStatus;
    getId = () => this.id;
    getProjectNames = () => this.projectNames;

    // * Setters
    setDescription = (text) => (this.description = text);
    setDueDate = (date) => (this.dueDate = date);
    setPriority = (level) => (this.priority = level);
    setProject = (project) => (this.project = project);
    setComment = (text) => (this.comment = text);
    setCheckStatus = (boolean) => (this.checkStatus = boolean);
    setId = () => (this.id = Date.now());
    setProjectName = (projectName) => this.projectNames.push(projectName);
}
