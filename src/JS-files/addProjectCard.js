import { Project, projectInstances } from './ProjectClass';
import { dom } from './global';
import '../CSS-files/addProjectCard.css';
import '../CSS-files/global.css';

const addProjectCard = (() => {
    const displayCard = () => {
        const $main = document.querySelector('main');
        const dialog = document.createElement('dialog');
        dialog.id = 'add-project-card';

        $main.appendChild(dialog);

        // * Title
        dom.createH(dialog, 'Add project', 3);

        // * Name
        const inputWrapper = document.createElement('div');
        inputWrapper.id = 'input-project-name-wrapper';

        const label = document.createElement('label');
        label.textContent = 'Name';

        const inputText = document.createElement('input');
        inputText.id = 'input-project-name';
        inputText.type = 'text';

        inputWrapper.append(label, inputText);
        dialog.appendChild(inputWrapper);

        // * Cancel button
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('add-project-card-btns-wrapper');

        const cancelBtn = dom.createBtn(buttonWrapper, 'button', 'class', ' card-btn cancel-btn', 'Cancel');
        const addBtn = dom.createBtn(buttonWrapper, 'button', 'class', 'card-btn add-btn', 'Add');

        dialog.appendChild(buttonWrapper);

        cancelBtn.addEventListener('click', () => {
            dialog.close();
        });

        addBtn.addEventListener('click', () => {
            const newProject = new Project(inputText.value);
            projectInstances.addInstance(newProject);
            dialog.close();
        });

        dialog.showModal();
    };

    return { displayCard };
})();

export { addProjectCard };
