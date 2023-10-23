// import Sortable from 'sortablejs';
import { dom, focusUp } from './global';
import { projectInstances } from './ProjectClass';
import { displaySidebar } from './sidebar';
import { displayHeader } from './header';
import '../CSS-files/pages/homePage.css';
import '../CSS-files/header.css';
import '../CSS-files/sidebar.css';
import '../CSS-files/variables.css';
import '../CSS-files/global.css';
import '../CSS-files/todoCard.css';
import '../CSS-files/todoAddCard.css';

import { toDoCard } from './toDoCard';
// import { searchFunction } from './utility';

export const loadMainPage = () => {
    // * Header
    document.body.appendChild(displayHeader());

    // * Main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    // * Sidebar
    $main.appendChild(displaySidebar());

    // * Display default project
    const defaultProject = projectInstances.getInstances().find((project) => project.getName() === 'default');
    $main.appendChild(displayItemList(defaultProject));
};

export const displayItemList = (project) => {
    if (project) {
        // * Create container
        const $itemList = document.createElement('div');
        $itemList.id = 'item-list';
        $itemList.classList.add('item-list');

        // * Display project title
        dom.createP($itemList, `${project.getName()}`, 'id', 'project-title');

        // * Display project todoItems
        project.getList().forEach((item) => {
            const $li = document.createElement('div');
            $li.setAttribute('data-project-id', `${item.getId()}`);

            const $checkbox = document.createElement('input');
            $checkbox.type = 'checkbox';
            $checkbox.name = 'checkStatus';
            $checkbox.value = 'true';
            $checkbox.id = 'checkbox';
            $li.classList.add('li-item');
            $li.appendChild($checkbox);

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

            $itemList.appendChild($li);

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
        // new Sortable($itemList);
        return $itemList;
    }
};
