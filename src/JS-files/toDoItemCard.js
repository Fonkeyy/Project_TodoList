import { dom } from './global';

export { toDoItemCard };

const toDoItemCard = (() => {
    const displayCard = (item) => {
        const $card = dom.createDiv(document.body, 'id', 'card');
        const $cardContent = dom.createDiv($card, 'id', 'card-content');

        // header-content
        const $headerContent = dom.createDiv($cardContent, 'class', 'header-content');
        dom.createP($headerContent, item.getProjectName());

        const $nextBtn = dom.createBtn($headerContent, 'button', 'class', 'next-btn');
        $nextBtn.addEventListener('click', () => {}); //todo => add function listener

        const $previousBtn = dom.createBtn($headerContent, 'button', 'class', 'previous-btn');
        $previousBtn.addEventListener('click', () => {}); //todo => add function listener

        const $moreBtn = dom.createBtn($headerContent, 'button', 'class', 'more-btn');
        $moreBtn.addEventListener('click', () => {}); //todo => add function listener

        const $closeBtn = dom.createBtn($headerContent, 'button', 'class', 'close-btn');
        $closeBtn.addEventListener('click', () => {}); //todo => add function listener

        // main-content
        const $mainContent = dom.createDiv($cardContent, 'class', 'main-content');

        const $checkbox = document.createElement('input');
        $checkbox.type = 'checkbox';
        $checkbox.name = 'checkStatus';
        $checkbox.value = 'true';
        $checkbox.id = 'checkbox';
        $mainContent.appendChild($checkbox);

        dom.createH($mainContent, item.getTitle(), 2);
        dom.createP($mainContent, item.getDescription(), 'class', 'item-description');
        dom.createP($mainContent, item.getComment(), 'class', 'item-comment');

        const $projectNameContainer = dom.createDiv(
            $mainContent,
            'class',
            'project-name-container'
        );
        dom.createLabel($projectNameContainer, item.getProjectName());

        const $dueDateContainer = dom.createDiv($mainContent, 'class', 'due-date-container');
        dom.createLabel($dueDateContainer, 'Due Date');
        //todo Implement date stuff

        const $priorityContainer = dom.createDiv($mainContent, 'class', 'priority-container');
        dom.createLabel($priorityContainer, 'Priority');
        //todo Create checkbox
    };

    const clearCard = () => {
        const $card = document.querySelector('#card');
        $card.remove();
        // const $card = document.querySelector('#card');

        // while ($card.firstChild) {
        //     $card.removeChild($card.firstChild);
        // }
    };

    return { displayCard, clearCard };
})();
