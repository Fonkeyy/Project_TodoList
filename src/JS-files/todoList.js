import { projectInstances } from './ProjectClass';
import { dom } from './global';
import { toDoCard } from './toDoCard';

import '../CSS-files/todoList.css';
import { todoAddCard } from './todoAddCard';
import { sidebar } from './sidebar';

export const todoList = (() => {
    const display = (project) => {
        const $mainContent = document.querySelector('#main-content');

        if (!project) {
            if (projectInstances.getInstances()) {
                project = projectInstances.getInstances()[0];
            }
        }
        if (project) {
            // * Container
            const $todoList = dom.createDiv($mainContent, 'id', 'todo-list');

            // * Project title
            dom.createP($todoList, `${project.name}`, 'id', 'project-title');

            if (project.list.length === 0 && project.name !== 'Archives') {
                const emptyContainer = dom.createDiv($todoList, 'class', 'empty-container');
                const btnWrapper = dom.createDiv(emptyContainer, 'class', 'btn-wrapper');
                const btn = dom.createBtn(
                    btnWrapper,
                    'button',
                    'class',
                    'new-todo-btn',
                    null,
                    'add first todo'
                );
                btn.addEventListener('click', () => {
                    todoAddCard.displayCard();
                });
                dom.createP(btnWrapper, 'Add task');
                dom.createP(emptyContainer, "Oops, it seems that you haven't added any task yet");
            }

            // * Display project todo
            project.list.forEach((todo) => {
                const item = document.createElement('div');
                item.setAttribute('data-project-id', `${todo.getId()}`);
                item.classList.add('todo');

                // * Checkbox
                const checkbox = dom.createCheckbox(todo.getPriority(), item, 'check if todo is done');
                checkbox.addEventListener('click', (e) => {
                    e.stopPropagation();
                    project.removeTodo(todo);
                    todo.setProjectName('Archives');
                    const archive = projectInstances
                        .getInstances()
                        .find((project) => project.name === 'Archives');
                    archive.addNewTodo(todo);
                    sidebar.update();
                    todoList.update(project);
                });

                // * Todo title
                dom.createP(item, todo.name, 'class', 'todo-title');

                // * More button
                const $moreBtn = dom.createBtn(
                    item,
                    'button',
                    'class',
                    ' svg more-btn',
                    null,
                    'more options'
                );
                item.addEventListener('mouseenter', () => {
                    $moreBtn.classList.toggle('opacity');
                });
                item.addEventListener('mouseleave', () => {
                    $moreBtn.classList.toggle('opacity');
                });

                $moreBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    item.appendChild(dom.createDropDown(todo));
                });

                // * Due date
                const dueDateWrapper = dom.createDiv(item, 'class', 'due-date-wrapper');
                dom.createDiv(dueDateWrapper, 'class', 'svg due-date-svg');
                const dueDate = todo.getDueDate() ? todo.getDueDate().toDateString() : '';
                dom.createP(dueDateWrapper, dueDate, 'class', 'due-date-value');
                // dom.createP(dueDateWrapper, todo.getDueDate().toDateString(), 'class', 'due-date-value');
                $todoList.appendChild(item);

                // * Display todoCard on click
                item.addEventListener('click', (e) => {
                    const todoDiv = e.currentTarget.closest('.todo');
                    if (todoDiv) {
                        const todoTitle = todoDiv.querySelector('.todo-title').textContent;
                        toDoCard.clearCard();
                        toDoCard.displayCard(project.getList().find((todo) => todo.name === todoTitle));
                    }
                });
            });

            return $todoList;
        }
    };
    const update = (project) => {
        const todoList = document.querySelector('#todo-list');
        if (todoList) {
            todoList.remove();
        }
        display(project);
    };

    return { display, update };
})();
