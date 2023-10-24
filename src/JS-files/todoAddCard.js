import { dom } from './global';
import { ToDoItem } from './ToDoClass';
import '../CSS-files/todoAddCard.css';
// import { displaySidebar } from './sidebar';

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
        const todoSelectPriority = document.createElement('select');
        todoSelectPriority.id = 'todo-select-priority';
        for (let i = 1; i < 5; i++) {
            const option = document.createElement('option');
            option.textContent = `Priority ${i}`;
            todoSelectPriority.appendChild(option);
        }
        // * First wrapper
        const firstWrapper = document.createElement('div');
        firstWrapper.append(todoInputDate, todoSelectPriority);

        //  * Project
        const todoSelectProject = dom.createSelectProject();

        // * Cancel button
        const $cancelBtn = dom.createBtn(dialog, 'button', 'class', 'card-btn cancel-btn', 'Cancel');
        $cancelBtn.addEventListener('click', closeCard);

        // * Add task button
        const $addTaskBtn = dom.createBtn(dialog, 'button', 'class', 'card-btn add-btn', 'Add task');
        $addTaskBtn.addEventListener('click', () => {
            const title = todoInputName.value;
            const description = todoInputDescription.value;
            const date = todoInputDate.value;
            const priority = todoSelectPriority.value;
            const projectName = todoSelectProject;
            console.log(todoSelectProject);

            new ToDoItem(title, description, date, priority, projectName);
            closeCard();
            // displaySidebar();
        });

        // * Button wrapper
        const buttonWrapper = document.createElement('div');
        buttonWrapper.append($cancelBtn, $addTaskBtn);

        // * Second wrapper
        const secondWrapper = document.createElement('div');
        secondWrapper.append(todoSelectProject, buttonWrapper);

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
