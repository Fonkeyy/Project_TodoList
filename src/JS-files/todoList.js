import { projectInstances } from './ProjectClass';
import { dom, focusUp } from './global';
import { toDoCard } from './toDoCard';

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
            const $todoList = dom.createDiv($mainContent, 'id', 'item-list');

            // * Display project title
            dom.createP($todoList, `${project.getName()}`, 'id', 'project-title');

            // * Display project todoItems
            project.getList().forEach((item) => {
                const $li = document.createElement('div');
                $li.setAttribute('data-project-id', `${item.getId()}`);

                const checkbox = dom.createCheckbox($li, item.getPriority());
                checkbox.addEventListener('click', (e) => e.stopPropagation());

                $li.classList.add('li-item');

                dom.createP($li, item.getTitle(), 'class', 'item-list-title');

                // * Create close btn and add styles
                const $closeBtn = dom.createBtn($li, 'button', 'class', 'close-btn');
                $li.addEventListener('mouseenter', () => {
                    $closeBtn.classList.toggle('opacity');
                });
                $li.addEventListener('mouseleave', () => {
                    $closeBtn.classList.toggle('opacity');
                });
                $closeBtn.addEventListener('click', () => {}); //todo => add function listener

                // * Display due date
                dom.createP($li, item.getDueDate(), 'class', 'item-list-due-date'); //todo => implement date stuff

                $todoList.appendChild($li);

                // * Add project todoItems event listener
                //todo change title for id
                $li.addEventListener('click', (e) => {
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
        document.querySelector('#item-list').remove();
        display(project);
    };

    return { display, update };
})();
