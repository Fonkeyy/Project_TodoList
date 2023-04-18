export class ToDoItem {
    constructor(
        title = null,
        description = null,
        dueDate = null,
        priority = null,
        comment = null,
        checkStatus = false
        // id = null
        // projectName = 'default'
    ) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.comment = comment;
        this.checkStatus = checkStatus;
        this.Id = null;
        this.projectName = 'default';

        this.setId();
    }

    //Getters
    getTitle = () => this.title;
    getDescription = () => this.description;
    getDueDate = () => this.dueDate;
    getPriority = () => this.priority;
    getComment = () => this.comment;
    getCheckStatus = () => this.checkStatus;
    getId = () => this.id;
    getProjectName = () => this.projectName;

    //Setters
    setDescription = (text) => (this.description = text);
    setDueDate = (date) => (this.dueDate = date);
    setPriority = (level) => (this.priority = level);
    setComment = (text) => (this.comment = text);
    setCheckStatus = (boolean) => (this.checkStatus = boolean);
    setId = () => (this.id = Date.now());
    setProjectName = (projectName) => (this.projectName = projectName);
}
