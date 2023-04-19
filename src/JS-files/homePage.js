import Sortable from 'sortablejs';
import { dom } from './global';
import { projectInstances } from './ProjectClass';
import '../CSS-files/pages/homePage.css';
import '../CSS-files/variables.css';
import { searchFunction } from './utility';

export const loadMainPage = () => {
    //header
    document.body.appendChild(displayHeader());

    //main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    $main.appendChild(displaySidebar());
    $main.appendChild(displayItemList(projectInstances.getInstances()[0].getList())); //todo => use the right project
};

const displayHeader = () => {
    const $header = document.createElement('header');

    const $headerLeftContainer = dom.createDiv($header, 'id', 'header-left-container');

    const $menuBtn = dom.createBtn($headerLeftContainer, 'button', 'id', 'header-menu-btn');
    $menuBtn.classList.add('header-btn');
    $menuBtn.addEventListener('click', () => {}); //todo => add function listener

    const $homeBtn = dom.createBtn($headerLeftContainer, 'button', 'id', 'header-home-btn');
    $homeBtn.classList.add('header-btn');
    $homeBtn.addEventListener('click', () => {}); //todo => add function listener

    const $searchInput = document.createElement('input');
    $searchInput.type = 'text';
    $searchInput.id = 'search-input';
    $searchInput.placeholder = 'Search';
    $headerLeftContainer.appendChild($searchInput);
    $searchInput.onkeyup = searchFunction();

    const $headerRightContainer = dom.createDiv($header, 'id', 'header-right-container');

    const $newTaskBtn = dom.createBtn($headerRightContainer, 'button', 'id', 'new-task-btn');
    $newTaskBtn.classList.add('header-btn');
    $newTaskBtn.addEventListener('click', () => {}); //todo => add function listener

    return $header;
};

const displaySidebar = () => {
    const $sidebar = document.createElement('div');
    $sidebar.classList.add('sidebar', 'hidden');

    const $sideProjectContainer = dom.createDiv($sidebar, 'id', 'side-project-container');
    const $sideProjectContainerTitle = dom.createH($sideProjectContainer, 'Projects', 3);

    const $addProjectBtn = dom.createBtn($sideProjectContainerTitle, 'button', 'class', 'hidden');
    $addProjectBtn.addEventListener('click', () => {}); //todo => add function listeners

    projectInstances.getInstances().forEach((project) => {
        const $projectItemContainer = dom.createDiv(
            $sideProjectContainer,
            'class',
            'project-container'
        );
        dom.createP($projectItemContainer, `${project.getName()}`, 'class', 'project-name');
        dom.createP($projectItemContainer, `${project.getLength()}`, 'class', 'project-length');
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
