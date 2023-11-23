import { dom } from './global';
import { displayHeader } from './header';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import '../CSS-files/pages/homePage.css';

export const loadMainPage = () => {
    // * Header
    document.body.appendChild(displayHeader());

    // * Main
    const $main = document.createElement('main');
    document.body.appendChild($main);

    // * Sidebar
    dom.createDiv($main, 'class', 'sidebar');
    sidebar.display();

    // * Main-content
    dom.createDiv($main, 'id', 'main-content');
    todoList.display();
};
