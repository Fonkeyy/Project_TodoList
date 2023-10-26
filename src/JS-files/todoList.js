import { projectInstances } from './ProjectClass';
import { dom, focusUp } from './global';
import { toDoCard } from './toDoCard';

import '../CSS-files/todoList.css';

export const todoList = (() => {
    const display = (project) => {
        const $mainContent = document.querySelector('#main-content');
        const defaultProject = projectInstances
            .getInstances()
            .find((project) => project.getName() === 'default');

        if (!project) {
            project = defaultProject;
        }
        if (project) {
            // * Create container
            const $todoList = dom.createDiv($mainContent, 'id', 'todo-list');

            // * Display project title
            dom.createP($todoList, `${project.getName()}`, 'id', 'project-title');

            // * Display project todoItems
            project.getList().forEach((item) => {
                const todo = document.createElement('div');
                todo.setAttribute('data-project-id', `${item.getId()}`);
                todo.classList.add('todo');

                const checkbox = dom.createCheckbox(todo, item.getPriority());
                checkbox.addEventListener('click', (e) => e.stopPropagation());

                dom.createP(todo, item.getTitle(), 'class', 'todo-title');

                // * Create close btn and add styles
                const $closeBtn = dom.createBtn(todo, 'button', 'class', 'close-btn');
                todo.addEventListener('mouseenter', () => {
                    $closeBtn.classList.toggle('opacity');
                });
                todo.addEventListener('mouseleave', () => {
                    $closeBtn.classList.toggle('opacity');
                });
                $closeBtn.addEventListener('click', () => {}); //todo => add function listener

                // * Display due date
                const dueDateWrapper = dom.createDiv(todo, 'class', 'due-date-wrapper');
                dom.createDiv(dueDateWrapper, 'class', 'svg due-date-svg');
                dom.createP(dueDateWrapper, item.getDueDate(), 'class', 'due-date-value'); //todo => implement date stuff

                $todoList.appendChild(todo);

                // * Add project todoItems event listener
                //todo change title for id
                todo.addEventListener('click', (e) => {
                    const itemTitle = e.target.closest('div').querySelector('p').textContent;

                    toDoCard.clearCard();
                    toDoCard.displayCard(project.getList().find((todo) => todo.getTitle() === itemTitle));
                    focusUp(document.body, document.querySelector('#card'));
                });
            });
            // const $mainContent = document.querySelector('#main-content');

            $mainContent.appendChild($todoList);
            return $todoList;
        }
    };
    const update = (project) => {
        document.querySelector('#todo-list').remove();
        display(project);
    };

    return { display, update };
})();
