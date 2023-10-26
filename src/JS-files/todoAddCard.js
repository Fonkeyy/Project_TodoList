import { dom } from './global';
import { ToDoItem } from './ToDoClass';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import { projectInstances } from './ProjectClass';

import '../CSS-files/todoAddCard.css';

const todoAddCard = (() => {
    const displayCard = () => {
        const $main = document.querySelector('main');
        const dialog = document.createElement('dialog');
        dialog.id = 'todo-add-card';

        $main.appendChild(dialog);

        // * Name
        const todoInputName = document.createElement('input');
        todoInputName.setAttribute('type', 'text');
        todoInputName.setAttribute('placeholder', 'Task name');
        todoInputName.id = 'todo-input-name';

        // * Description
        const todoInputDescription = document.createElement('input');
        todoInputDescription.setAttribute('type', 'text');
        todoInputDescription.setAttribute('placeholder', 'Description');
        todoInputDescription.id = 'todo-input-description';

        // * Date
        const todoInputDate = document.createElement('input');
        todoInputDate.setAttribute('type', 'date');
        todoInputDate.id = 'todo-input-date';

        // * Priority
        const todoSelectDialog = dom.createSelectPriority();

        // * First wrapper
        const firstWrapper = document.createElement('div');
        firstWrapper.append(todoInputDate, todoSelectDialog);

        //  * Project
        const todoSelectProject = dom.createSelectProject();
        const todoSelectProjectWrapper = todoSelectProject.selectWrapper;
        const select = todoSelectProject.selectProject;

        // * Button wrapper
        const { cancelBtn, addTaskBtn, buttonWrapper } = dom.createButtonWrapper();

        // * Cancel button
        cancelBtn.addEventListener('click', closeCard);

        // * Add task button
        addTaskBtn.addEventListener('click', () => {
            const title = todoInputName.value;
            const description = todoInputDescription.value;
            const date = todoInputDate.value;
            const priority = todoSelectDialog.value;
            const projectName = select.value;

            new ToDoItem(title, description, date, priority, projectName);
            closeCard();
            sidebar.update();

            const project = projectInstances.getInstances().find((project) => project.name === projectName);
            todoList.update(project);
        });

        // * Second wrapper
        const secondWrapper = document.createElement('div');
        secondWrapper.append(todoSelectProjectWrapper, buttonWrapper);

        dialog.append(todoInputName, todoInputDescription, firstWrapper, secondWrapper);

        dialog.showModal();
    };

    const closeCard = () => {
        const dialog = document.querySelector('#todo-add-card');
        dialog.remove();
    };

    return { displayCard, closeCard };
})();

export { todoAddCard };
