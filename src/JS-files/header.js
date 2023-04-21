import { dom } from './global';
import { todoAddCard } from './todoAddCard';
export { displayHeader };

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
    // $searchInput.onkeyup = searchFunction();

    const $headerRightContainer = dom.createDiv($header, 'id', 'header-right-container');

    const $newTaskBtn = dom.createBtn($headerRightContainer, 'button', 'id', 'new-task-btn');
    $newTaskBtn.classList.add('header-btn');
    $newTaskBtn.addEventListener('click', () => {
        todoAddCard.displayCard();
    });

    return $header;
};
