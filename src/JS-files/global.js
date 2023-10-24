export { dom, focusUp, focusDown };

import '../CSS-files/global.css';
import { projectInstances } from './ProjectClass';

const dom = (() => {
    const createDiv = (parent, attribute, attributeName) => {
        const div = document.createElement('div');
        div.setAttribute(attribute, attributeName);
        parent.appendChild(div);
        return div;
    };

    const createH = (parent, text, number, attribute, attributeName) => {
        const h = document.createElement(`h${number}`);
        h.textContent = text;
        parent.appendChild(h);
        h.setAttribute(attribute, attributeName);
        return h;
    };

    const createP = (parent, text, attribute, attributeName) => {
        const p = document.createElement('p');
        p.textContent = text;
        parent.appendChild(p);
        p.setAttribute(attribute, attributeName);
        return p;
    };

    const createBtn = (parent, type, attribute, attributeName, text) => {
        const btn = document.createElement('button');
        parent.appendChild(btn);
        btn.type = type;
        btn.setAttribute(attribute, attributeName);
        btn.textContent = text;
        return btn;
    };

    const createImg = (parent, src, attribute, attributeName) => {
        const img = document.createElement('img');
        img.src = src;
        img.setAttribute(attribute, attributeName);
        parent.appendChild(img);
        return img;
    };

    const createInputText = (parent, labelText, labelVisibility, attribute, attributeName) => {
        const inputWrapper = document.createElement('div');
        inputWrapper.setAttribute(attribute, attributeName);

        const label = document.createElement('label');
        label.textContent = labelText;
        label.className = !labelVisibility && 'hide-label';

        const inputText = document.createElement('input');
        inputText.type = 'text';

        inputWrapper.append(label, inputText);
        parent.appendChild(inputWrapper);

        return inputText;
    };

    const createLabel = (parent, text, attribute, attributeName) => {
        const label = document.createElement('label');
        label.textContent = text;
        label.setAttribute(attribute, attributeName);
        parent.appendChild(label);
        return label;
    };

    const createCheckbox = (parent, priority) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        switch (priority) {
            case 'P1':
                checkbox.className = 'P1';
                break;
            case 'P2':
                checkbox.className = 'P2';
                break;
            case 'P3':
                checkbox.className = 'P3';
                break;
            case 'P4':
                checkbox.className = 'P4';
                break;
        }
        checkbox.name = 'checkStatus';
        checkbox.id = 'checkbox';

        parent.appendChild(checkbox);
        return checkbox;
    };

    const createSelectProject = (parent, todo) => {
        const selectProject = document.createElement('select');
        selectProject.id = 'project-select';

        const projectInstancesArray = projectInstances.getInstances();

        let selectedValue;

        if (todo) {
            const firstOption = document.createElement('option');
            firstOption.textContent = todo.getProjectName() || 'default';
            selectProject.appendChild(firstOption);

            projectInstancesArray
                .filter((project) => project.getName() != todo.getProjectName())
                .forEach((project) => {
                    const option = document.createElement('option');
                    option.textContent = project.getName();
                    selectProject.appendChild(option);
                });
        } else {
            projectInstancesArray.forEach((project) => {
                const option = document.createElement('option');
                option.textContent = project.getName();
                selectProject.appendChild(option);
            });
        }
        selectProject.addEventListener('change', (e) => {
            console.log(e.target.value);
            console.log(selectProject.value);
            selectedValue = e.target.value;

            if (todo) {
                todo.setProject(e.target.value);
            }
        });
        parent.appendChild(selectProject);
        console.log(selectedValue);
        return selectedValue;
    };

    return {
        createDiv,
        createH,
        createP,
        createBtn,
        createImg,
        createInputText,
        createLabel,
        createCheckbox,
        createSelectProject,
    };
})();

const focusUp = (parent, child) => {
    const focusDiv = document.createElement('div');
    focusDiv.id = 'focus-div';
    parent.appendChild(focusDiv);
    focusDiv.appendChild(child);
    focusDiv.classList.add('focus-up');
};

const focusDown = () => {
    const focusDiv = document.querySelector('#focus-div');
    focusDiv.remove();
};
