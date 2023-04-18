import Sortable from 'sortablejs';
import { dom } from './global';
import { projectInstances } from './ProjectClass';
import '../CSS-files/pages/homePage.css';
import '../CSS-files/variables.css';

export const loadMainPage = () => {
    //header
    const $header = document.createElement('header');
    document.body.appendChild($header);
    $header.appendChild(displayHeader());

    //main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    $main.appendChild(displaySidebar());
    $main.appendChild(displayItemList(projectInstances.getInstances()[0].getList())); //todo => use the right project
};

const displayHeader = () => {
    const $headerContent = document.createElement('div');
    $headerContent.classList.add('header-content');

    const $menuBtn = dom.createBtn($headerContent, 'button', 'id', 'header-menu-btn');
    $menuBtn.classList.add('header-btn');
    $menuBtn.addEventListener('click', () => {}); //todo => add function listener

    const $homeBtn = dom.createBtn($headerContent, 'button', 'id', 'header-home-btn');
    $homeBtn.classList.add('header-btn');
    $homeBtn.addEventListener('click', () => {}); //todo => add function listener

    //todo => implement searchbar

    const $newTaskBtn = dom.createBtn($headerContent, 'button', 'id', 'new-task-btn');
    $newTaskBtn.classList.add('header-btn');
    $newTaskBtn.addEventListener('click', () => {}); //todo => add function listener

    return $headerContent;
};

const displaySidebar = () => {
    const $sidebar = document.createElement('div');
    $sidebar.classList.add('sidebar', 'hidden');

    projectInstances.getInstances().forEach((project) => {
        const $projectContainer = dom.createDiv($sidebar, 'class', 'project-container');
        dom.createP($projectContainer, `${project.getName()}`, 'class', 'project-name');
        dom.createP($projectContainer, `${project.getLength()}`, 'class', 'project-length');
        $sidebar.appendChild($projectContainer);
    });

    return $sidebar;
};

const displayItemList = (project) => {
    const $itemList = document.createElement('div');
    $itemList.id = 'itemList';
    $itemList.classList.add('item-list');

    project.forEach((item) => {
        const $li = document.createElement('div');
        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.name = 'checkStatus';
        $checkbox.value = 'true';
        $checkbox.id = 'checkbox';
        $li.appendChild($checkbox);

        dom.createP($li, item.getTitle(), 'class', 'item-list-title');
        dom.createP($li, item.getDueDate(), 'class', 'item-list-due-date'); //todo => implement date stuff

        const $closeBtn = dom.createBtn($li, 'button', 'class', 'close-btn');
        $closeBtn.addEventListener('click', () => {}); //todo => add function listener

        $itemList.appendChild($li);
    });
    new Sortable($itemList);
    return $itemList;
};
