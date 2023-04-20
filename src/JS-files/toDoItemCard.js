import { dom } from './global';

export { toDoItemCard };

const toDoItemCard = (() => {
    const displayCard = (item) => {
        const $card = dom.createDiv(document.body, 'id', 'card');
        const $cardContent = dom.createDiv($card, 'id', 'card-content');

        // header-content
        const $headerContent = dom.createDiv($cardContent, 'class', 'header-content');
        dom.createP($headerContent, item.getProjectNames());

        const $nextBtn = dom.createBtn($headerContent, 'button', 'class', 'next-btn');
        $nextBtn.classList.add('header-btn');
        $nextBtn.addEventListener('click', () => {}); //todo => add function listener

        const $previousBtn = dom.createBtn($headerContent, 'button', 'class', 'previous-btn');
        $previousBtn.classList.add('header-btn');
        $previousBtn.addEventListener('click', () => {}); //todo => add function listener

        const $moreBtn = dom.createBtn($headerContent, 'button', 'class', 'more-btn');
        $moreBtn.classList.add('header-btn');
        $moreBtn.addEventListener('click', () => {}); //todo => add function listener

        const $closeBtn = dom.createBtn($headerContent, 'button', 'class', 'close-btn');
        $moreBtn.classList.add('header-btn');
        $closeBtn.addEventListener('click', () => {
            clearCard();
        });

        // main-content
        const $mainContent = dom.createDiv($cardContent, 'class', 'main-content');

        const $titleContainer = dom.createDiv($mainContent, 'id', 'title-container');
        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.name = 'checkStatus';
        $checkbox.value = 'true';
        $checkbox.id = 'checkbox';
        $titleContainer.appendChild($checkbox);

        dom.createH($titleContainer, item.getTitle(), 2);

        const $itemDescriptionContainer = dom.createDiv(
            $mainContent,
            'id',
            'item-description-container'
        );
        dom.createDiv($itemDescriptionContainer, 'class', 'svg-card');
        dom.createP($itemDescriptionContainer, item.getDescription(), 'class', 'item-description');

        const $projectNameContainer = dom.createDiv(
            $mainContent,
            'class',
            'project-name-container'
        );
        dom.createLabel($projectNameContainer, item.getProjectNames());

        const $dueDateContainer = dom.createDiv($mainContent, 'class', 'due-date-container');
        dom.createLabel($dueDateContainer, 'Due Date');
        //todo Implement date stuff

        const $priorityContainer = dom.createDiv($mainContent, 'class', 'priority-container');
        dom.createLabel($priorityContainer, 'Priority');
        //todo Create checkbox

        dom.createP($mainContent, item.getComment(), 'class', 'item-comment');

        $card.classList.toggle('opacity');
    };

    const clearCard = () => {
        const $card = document.querySelector('#card');
        if ($card) {
            $card.remove();
        }
    };

    return { displayCard, clearCard };
})();
