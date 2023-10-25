import { dom } from './global';
import { todoAddCard } from './todoAddCard';
import '../CSS-files/header.css';

export { displayHeader };

const displayHeader = () => {
    const $header = document.createElement('header');

    const $headerLeftContainer = dom.createDiv($header, 'id', 'header-left-container');

    // * Menu button
    const $menuBtn = dom.createBtn($headerLeftContainer, 'button', 'id', 'header-menu-btn');
    $menuBtn.classList.add('header-btn');
    $menuBtn.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // * Home button
    const $homeBtn = dom.createBtn($headerLeftContainer, 'button', 'id', 'header-home-btn');
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
    // $searchInput.onkeyup = searchFunction();

    const $headerRightContainer = dom.createDiv($header, 'id', 'header-right-container');

    const $newTaskBtn = dom.createBtn($headerRightContainer, 'button', 'id', 'new-task-btn');
    $newTaskBtn.classList.add('header-btn');
    $newTaskBtn.addEventListener('click', () => {
        todoAddCard.displayCard();
    });

    return $header;
};
