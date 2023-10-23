import { dom } from './global';
import { ToDoItem } from './ToDoClass';
import '../CSS-files/todoAddCard.css';

const todoAddCard = (() => {
    const displayCard = () => {
        const $main = document.querySelector('main');
        const $todoAddCard = dom.createDiv($main, 'id', 'todo-add-card');

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
        const todoSelectPriority = document.createElement('select');
        todoSelectPriority.id = 'todo-select-priority';
        for (let i = 1; i < 5; i++) {
            const option = document.createElement('option');
            option.textContent = `Priority ${i}`;
            todoSelectPriority.appendChild(option);
        }

        //  * Project
        const todoSelectProject = dom.createSelectProject($todoAddCard);

        // * Cancel button
        const $cancelBtn = dom.createBtn($todoAddCard, 'button', 'id', 'cancel-btn', 'Cancel');
        $cancelBtn.addEventListener('click', closeCard);

        // * Add task button
        const $addTaskBtn = dom.createBtn($todoAddCard, 'button', 'id', 'add-task-btn', 'Add task');
        $addTaskBtn.addEventListener('click', () => {
            const title = todoInputName.value;
            const description = todoInputDescription.value;
            const date = todoInputDate.value;
            const priority = todoSelectPriority.value;
            const projectName = todoSelectProject;
            console.log(todoSelectProject);

            new ToDoItem(title, description, date, priority, projectName);
            closeCard();
        });

        $todoAddCard.append(
            todoInputName,
            todoInputDescription,
            todoInputDate,
            todoSelectPriority,
            $cancelBtn,
            $addTaskBtn
        );
    };

    const closeCard = () => {
        const $todoAddCard = document.querySelector('#todo-add-card');
        $todoAddCard.remove();
    };

    return { displayCard, closeCard };
})();

export { todoAddCard };
