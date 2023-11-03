import { dom } from './global';
import { todoAddCard } from './todoAddCard';
import '../CSS-files/header.css';

export { displayHeader };

const displayHeader = () => {
    const $header = document.createElement('header');

    const $headerLeftContainer = dom.createDiv($header, 'id', 'header-left-container');

    // * Menu button
    const $menuBtn = dom.createBtn(
        $headerLeftContainer,
        'button',
        'id',
        'header-menu-btn',
        null,
        'menu button'
    );
    $menuBtn.classList.add('header-btn');
    $menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // * Home button
    const $homeBtn = dom.createBtn(
        $headerLeftContainer,
        'button',
        'id',
        'header-home-btn',
        null,
        'home button'
    );
    $homeBtn.classList.add('header-btn');
    $homeBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // * SearchBar
    const searchBarWrapper = document.createElement('div');
    searchBarWrapper.classList.add('searchBar-wrapper');
    const $searchInput = document.createElement('input');
    $searchInput.type = 'text';
    $searchInput.id = 'search-input';
    $searchInput.placeholder = 'Search';

    const svg = document.createElement('div');
    svg.classList.add('searchBar-svg');
    searchBarWrapper.append($searchInput, svg);

    $headerLeftContainer.appendChild(searchBarWrapper);

    const $headerRightContainer = dom.createDiv($header, 'id', 'header-right-container');

    // * New todo btn
    const $newTodoBtn = dom.createBtn(
        $headerRightContainer,
        'button',
        'class',
        'new-todo-btn header-btn',
        null,
        'add new todo'
    );
    $newTodoBtn.addEventListener('click', () => {
        todoAddCard.displayCard();
    });

    return $header;
};
