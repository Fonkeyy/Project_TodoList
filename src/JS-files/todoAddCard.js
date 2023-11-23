import { dom } from './global';
import { TodoItem } from './ToDoClass';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import { projectInstances } from './ProjectClass';
import { storageService } from './storageService';
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
        let selectedPriorityLevel = '4';
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
            const name = todoInputName.value;
            const description = todoInputDescription.value;
            const date = todoInputDate.value ? new Date(todoInputDate.value) : '';
            const priority = selectedPriorityLevel;
            const projectName = selectProject.value;

            const project = projectInstances.getInstances().find((project) => project.name === projectName);

            const newTodo = new TodoItem(name, description, date, priority, projectName);
            project.addNewTodo(newTodo);
            todoList.update(project);

            storageService.set('instances', JSON.stringify(projectInstances.getInstances()));

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
