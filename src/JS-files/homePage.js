// import Sortable from 'sortablejs';
import { dom, focusUp } from './global';
import { projectInstances } from './ProjectClass';
import { displayHeader } from './header';
import '../CSS-files/pages/homePage.css';
import '../CSS-files/header.css';
import '../CSS-files/sidebar.css';
import '../CSS-files/variables.css';
import '../CSS-files/global.css';
import '../CSS-files/todoCard.css';
import '../CSS-files/todoAddCard.css';

import { toDoCard } from './toDoCard';
import { sidebar } from './sidebar';

export const loadMainPage = () => {
    // * Header
    document.body.appendChild(displayHeader());

    // * Main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    // * Sidebar
    dom.createDiv($main, 'class', 'sidebar');
    sidebar.display();

    // * Display default project
    const defaultProject = projectInstances.getInstances().find((project) => project.getName() === 'default');
    $main.appendChild(displayListItem(defaultProject));
};

export const displayListItem = (project) => {
    if (project) {
        // * Create container
        const $listItem = document.createElement('div');
        $listItem.id = 'list-item';
        $listItem.classList.add('list-item');

        // * Display project title
        dom.createP($listItem, `${project.getName()}`, 'id', 'project-title');

        // * Display project todoItems
        project.getList().forEach((item) => {
            const $li = document.createElement('div');
            $li.setAttribute('data-project-id', `${item.getId()}`);

            const checkbox = dom.createCheckbox($li, item.getPriority());
            checkbox.addEventListener('click', (e) => e.stopPropagation());

            $li.classList.add('li-item');

            dom.createP($li, item.getTitle(), 'class', 'list-item-title');

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
            dom.createP($li, item.getDueDate(), 'class', 'list-item-due-date'); //todo => implement date stuff

            $listItem.appendChild($li);

            // * Add project todoItems event listener
            //todo change title for id
            $li.addEventListener('click', (e) => {
                const itemTitle = e.target.closest('div').querySelector('p').textContent;

                toDoCard.clearCard();
                toDoCard.displayCard(project.getList().find((todo) => todo.getTitle() === itemTitle));
                focusUp(document.body, document.querySelector('#card'));
            });
        });

        // Create draggable list
        // new Sortable($listItem);
        return $listItem;
    }
};
