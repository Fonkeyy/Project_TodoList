import { Project, projectInstances } from './ProjectClass';
import { dom } from './global';

const addProjectCard = (() => {
    const displayCard = () => {
        const $main = document.querySelector('main');
        const dialog = document.createElement('dialog');

        $main.appendChild(dialog);

        // * Title
        dom.createH(dialog, 'Add project', 3);

        // * Name
        const inputName = dom.createInputText(dialog, 'Name', true, 'id', 'input-project-name');

        // * Cancel button
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('add-project-card-btns-wrapper');

        const cancelBtn = dom.createBtn(buttonWrapper, 'button', 'classList', 'cancel-btn', 'Cancel');
        const addBtn = dom.createBtn(buttonWrapper, 'button', 'classList', 'add-btn', 'Add');

        dialog.appendChild(buttonWrapper);

        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });

        addBtn.addEventListener('click', () => {
            const newProject = new Project(inputName.value);
            projectInstances.addInstance(newProject);
            dialog.close();
        });

        dialog.showModal();
    };

    return { displayCard };
})();

export { addProjectCard };
