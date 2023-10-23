import { dom, focusDown } from './global';

export { toDoCard };

const toDoCard = (() => {
    const displayCard = (item) => {
        // const $cardFocus = dom.createDiv(document.body, 'id', 'card-focus');
        const $card = dom.createDiv(document.body, 'id', 'card');
        $card.classList.toggle('opacity');

        const $cardContent = dom.createDiv($card, 'id', 'card-content');

        // * header-content
        const $headerContent = dom.createDiv($cardContent, 'class', 'header-content');
        const $headerContentLeft = dom.createDiv($headerContent, 'id', 'header-content-left');
        const $headerContentRight = dom.createDiv($headerContent, 'id', 'header-content-right');

        // * Project name
        const $projectNameSvg = dom.createDiv($headerContentLeft, 'class', 'svg-card');
        $projectNameSvg.id = 'project-name-svg';
        dom.createP($headerContentLeft, item.getProjectNames());

        // * Next button
        const $nextBtn = dom.createBtn($headerContentRight, 'button', 'class', 'next-btn');
        $nextBtn.classList.add('header-card-btn');
        $nextBtn.addEventListener('click', () => {}); //todo => add function listener

        // * Previous button
        const $previousBtn = dom.createBtn($headerContentRight, 'button', 'class', 'previous-btn');
        $previousBtn.classList.add('header-card-btn');
        $previousBtn.addEventListener('click', () => {}); //todo => add function listener

        // * More button
        const $moreBtn = dom.createBtn($headerContentRight, 'button', 'class', 'more-btn');
        $moreBtn.classList.add('header-card-btn');
        $moreBtn.addEventListener('click', () => {}); //todo => add function listener

        // * Close button
        const $closeBtn = dom.createBtn($headerContentRight, 'button', 'class', 'close-btn');
        $closeBtn.classList.add('header-card-btn');
        $closeBtn.addEventListener('click', () => {
            clearCard();
            focusDown();
        });

        // * Main-content
        const $mainContent = dom.createDiv($cardContent, 'id', 'main-content');

        // * Title
        const $titleContainer = dom.createDiv($mainContent, 'id', 'title-container');
        dom.createCheckbox($titleContainer, item.getPriority());
        dom.createH($titleContainer, item.getTitle(), 2);

        // * Description
        const $itemDescriptionContainer = dom.createDiv($mainContent, 'id', 'item-description-container');
        const $descriptionSvg = dom.createDiv($itemDescriptionContainer, 'class', 'svg-card');
        $descriptionSvg.id = 'description-svg';
        dom.createP($itemDescriptionContainer, item.getDescription(), 'class', 'item-description');

        // * Project
        const $projectNameContainer = dom.createDiv($mainContent, 'id', 'project-name-container');
        $projectNameContainer.classList.add('due-container');
        const $projectSvg = dom.createDiv($projectNameContainer, 'class', 'svg-card');
        $projectSvg.id = 'project-svg';
        dom.createLabel($projectNameContainer, 'Project');

        // const projectName = dom.createP($projectNameContainer, item.getProjectNames());

        // projectName.addEventListener('click', () => {
        //     projectName.classList.toggle('display-none');
        //     const select = dom.createSelectProject($projectNameContainer);
        //     select.addEventListener('onchange', (e) => {
        //         item.setPriority(e.value);
        //         projectName.classList.toggle('display-none');
        //         select.classList.toggle('display-none');
        //     });
        // });

        dom.createSelectProject($projectNameContainer, item);

        // * Due date
        const $dueDateContainer = dom.createDiv($mainContent, 'id', 'due-date-container');
        $dueDateContainer.classList.add('due-container');
        const $dueDateSvg = dom.createDiv($dueDateContainer, 'class', 'svg-card');
        $dueDateSvg.id = 'due-date-svg';
        dom.createLabel($dueDateContainer, 'Due Date');
        dom.createP($dueDateContainer, item.getDueDate());

        // * Priority
        const $priorityContainer = dom.createDiv($mainContent, 'id', 'priority-container');
        $priorityContainer.classList.add('due-container');
        const $prioritySvg = dom.createDiv($priorityContainer, 'class', 'svg-card');
        $prioritySvg.id = 'priority-svg';
        dom.createLabel($priorityContainer, 'Priority');
        dom.createP($priorityContainer, item.getPriority());

        // * Comment
        dom.createP($mainContent, item.getComment(), 'class', 'item-comment');
    };

    const clearCard = () => {
        const $card = document.querySelector('#card');
        if ($card) {
            $card.remove();
        }
    };

    return { displayCard, clearCard };
})();
