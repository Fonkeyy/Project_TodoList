import { dom } from './global';

const addProjectCard = (() => {
    const displayCard = () => {
        const $main = document.querySelector('main');
        const $addProjectCard = dom.createDiv($main, 'id', 'new-project-card');

        // * Title
        dom.createH($addProjectCard, 'Add project', 3);

        // * Name
        dom.createInputText($addProjectCard, 'Name', true, 'id', 'input-project-name');

        // * Cancel button
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('add-project-card-btns-wrapper');

        const $cancelBtn = dom.createBtn(buttonWrapper, 'button', 'classList', 'cancel-btn', 'Cancel');
        const $addBtn = dom.createBtn(buttonWrapper, 'button', 'classList', 'add-btn', 'Add');

        $addProjectCard.appendChild(buttonWrapper);
    };
    return { displayCard };
})();

export { addProjectCard };
