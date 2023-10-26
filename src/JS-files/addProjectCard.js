import { Project } from './ProjectClass';
import { dom } from './global';
import { sidebar } from './sidebar';
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

        // * Button wrapper
        const { cancelBtn, addTaskBtn, buttonWrapper } = dom.createButtonWrapper();

        buttonWrapper.classList.add('add-project-card-btns-wrapper');

        dialog.appendChild(buttonWrapper);

        cancelBtn.addEventListener('click', () => {
            dialog.remove();
        });

        addTaskBtn.addEventListener('click', () => {
            new Project(inputText.value);
            dialog.remove();
            sidebar.update();
        });
        dialog.showModal();
    };

    return { displayCard };
})();

export { addProjectCard };
