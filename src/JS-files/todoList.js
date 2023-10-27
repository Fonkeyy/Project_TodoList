import { projectInstances } from './ProjectClass';
import { dom } from './global';
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
            // * Container
            const $todoList = dom.createDiv($mainContent, 'id', 'todo-list');

            // * Project title
            dom.createP($todoList, `${project.getName()}`, 'id', 'project-title');

            // * Display project todo
            project.getList().forEach((todo) => {
                const item = document.createElement('div');
                item.setAttribute('data-project-id', `${todo.getId()}`);
                item.classList.add('todo');

                // * Checkbox
                const checkbox = dom.createCheckbox(item, todo.getPriority());
                checkbox.addEventListener('click', (e) => e.stopPropagation());

                // * Todo title
                dom.createP(item, todo.getName(), 'class', 'todo-title');

                // * More button
                const $moreBtn = dom.createBtn(item, 'button', 'class', ' svg more-btn');
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
                dom.createP(dueDateWrapper, todo.getDueDate(), 'class', 'due-date-value');
                $todoList.appendChild(item);

                // * Display todoCard on click
                item.addEventListener('click', async (e) => {
                    const todoTitle = e.target.closest('div').querySelector('.todo-title').textContent;
                    console.log(todoTitle);

                    toDoCard.clearCard();
                    await toDoCard.displayCard(
                        project.getList().find((todo) => todo.getName() === todoTitle)
                    );
                });
            });

            // $mainContent.appendChild($todoList);
            return $todoList;
        }
    };
    const update = (project) => {
        document.querySelector('#todo-list').remove();
        display(project);
    };

    return { display, update };
})();
