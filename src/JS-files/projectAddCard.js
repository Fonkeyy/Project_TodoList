import { Project, projectInstances } from './ProjectClass';
import { dom } from './global';
import { sidebar } from './sidebar';
import { storageService } from './storageService';
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
        const { cancelBtn, addTodoBtn, buttonWrapper } = dom.createButtonWrapper();

        addTodoBtn.textContent = 'Add';
        buttonWrapper.classList.add('add-project-card-btns-wrapper');

        dialog.appendChild(buttonWrapper);

        cancelBtn.addEventListener('click', () => {
            dialog.remove();
        });

        addTodoBtn.addEventListener('click', () => {
            const newProject = new Project(inputText.value);
            projectInstances.addInstance(newProject);

            storageService.set(`${inputText.value}`, JSON.stringify(newProject));
            storageService.set('instances', JSON.stringify(projectInstances.instances));
            dialog.remove();
            sidebar.update();
        });
        dialog.showModal();
    };

    return { displayCard };
})();

export { addProjectCard };
