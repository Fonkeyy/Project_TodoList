import { dom } from './global';
import { TodoItem } from './ToDoClass';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import { projectInstances } from './ProjectClass';

import '../CSS-files/todoAddCard.css';
import { storageService } from './storageService';

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
        let selectedPriorityLevel;
        const handlePriorityChange = (priority) => {
            selectedPriorityLevel = priority;
        };

        const { $priorityContainer } = dom.createSelectPriority(handlePriorityChange);

        // * First wrapper
        const firstWrapper = document.createElement('div');
        firstWrapper.append(todoInputDate, $priorityContainer);

        //  * Project
        const { selectWrapper, selectProject } = dom.createSelectProject();

        // * Button wrapper
        const { cancelBtn, addTodoBtn, buttonWrapper } = dom.createButtonWrapper();

        // * Cancel button
        cancelBtn.addEventListener('click', closeCard);

        // * Add todo button
        addTodoBtn.addEventListener('click', () => {
            const title = todoInputName.value;
            const description = todoInputDescription.value;
            const date = todoInputDate.value;
            const priority = selectedPriorityLevel;
            const projectName = selectProject.value;

            const newTodo = new TodoItem(title, description, date, priority, projectName);
            const project = projectInstances.getInstances().find((project) => project.name === projectName);
            project.addNewTodo(newTodo);
            newTodo.setProject(project);
            todoList.update(project);

            const data = JSON.parse(storageService.get(`${projectName}`));
            data.list.push(newTodo);
            storageService.set(`${projectName}`, JSON.stringify(data));

            closeCard();
            sidebar.update();
        });

        // * Second wrapper
        const secondWrapper = document.createElement('div');
        secondWrapper.append(selectWrapper, buttonWrapper);

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
