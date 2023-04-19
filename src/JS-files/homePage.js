import Sortable from 'sortablejs';
import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { displaySidebar } from './sidebar';
import { displayHeader } from './header';
import '../CSS-files/pages/homePage.css';
import '../CSS-files/variables.css';
import '../CSS-files/global.css';
// import { searchFunction } from './utility';

export const loadMainPage = () => {
    //header
    document.body.appendChild(displayHeader());

    //main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    $main.appendChild(displaySidebar());

    const defaultProject = projectInstances
        .getInstances()
        .find((project) => project.getName() === 'default');
    $main.appendChild(displayItemList(defaultProject));
};

const displayItemList = (project) => {
    const $itemList = document.createElement('div');
    $itemList.id = 'item-list';
    $itemList.classList.add('item-list');

    dom.createP($itemList, `${project.getName()}`, 'id', 'project-title');

    project.getList().forEach((item) => {
        const $li = document.createElement('div');
        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.name = 'checkStatus';
        $checkbox.value = 'true';
        $checkbox.id = 'checkbox';
        $li.classList.add('li-item');
        $li.appendChild($checkbox);

        dom.createP($li, item.getTitle(), 'class', 'item-list-title');

        const $closeBtn = dom.createBtn($li, 'button', 'class', 'close-btn');
        $closeBtn.classList.add('hidden');
        $li.addEventListener('mouseover', () => {
            $closeBtn.classList.toggle('hidden');
        });
        $li.addEventListener('mouseout', () => {
            $closeBtn.classList.toggle('hidden');
        });
        $closeBtn.addEventListener('click', () => {}); //todo => add function listener

        dom.createP($li, item.getDueDate(), 'class', 'item-list-due-date'); //todo => implement date stuff

        $itemList.appendChild($li);
    });
    new Sortable($itemList);
    return $itemList;
};
