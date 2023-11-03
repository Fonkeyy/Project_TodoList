import { projectInstances } from './ProjectClass';

export class TodoItem {
    constructor(
        name = null,
        description = null,
        dueDate = null,
        priority = null,
        projectName = null,
        comment = null,
        checkStatus = false
    ) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectName = projectName;
        this.comment = comment;
        this.checkStatus = checkStatus;
        this.Id = Date.now();
    }

    // * Getters
    getDescription = () => this.description;
    getDueDate = () => this.dueDate;
    getPriority = () => this.priority;
    getProject = () => projectInstances.instances.find((project) => project.name === this.projectName);
    getProjectName = () => this.projectName;
    getComment = () => this.comment;
    getCheckStatus = () => this.checkStatus;
    getId = () => this.id;

    // * Setters
    setDescription = (text) => (this.description = text);
    setDueDate = (date) => (this.dueDate = date);
    setPriority = (level) => (this.priority = level);
    setProject = (project) => (this.project = project);
    setProjectName = (name) => (this.projectName = name);
    setComment = (text) => (this.comment = text);
    setCheckStatus = (boolean) => (this.checkStatus = boolean);
}
