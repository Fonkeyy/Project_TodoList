export { dom, focusUp, focusDown };

import { projectInstances } from './ProjectClass';
import '../CSS-files/global.css';

const dom = (() => {
    const createDiv = (parent, attribute, attributeName) => {
        const div = document.createElement('div');
        if (parent) {
            parent.appendChild(div);
        }
        if (attribute && attributeName) {
            div.setAttribute(attribute, attributeName);
        }
        return div;
    };

    const createH = (parent, text, number, attribute, attributeName) => {
        const h = document.createElement(`h${number}`);
        h.textContent = text;
        if (parent) {
            parent.appendChild(h);
        }
        if (attribute && attributeName) {
            h.setAttribute(attribute, attributeName);
        }
        return h;
    };

    const createP = (parent, text, attribute, attributeName) => {
        const p = document.createElement('p');
        p.textContent = text;
        if (parent) {
            parent.appendChild(p);
        }
        if (attribute && attributeName) {
            p.setAttribute(attribute, attributeName);
        }
        return p;
    };

    const createBtn = (parent, type = 'button', attribute, attributeName, text) => {
        const btn = document.createElement('button');
        btn.type = type;
        if (parent) {
            parent.appendChild(btn);
        }
        if (text) {
            btn.textContent = text;
        }
        if (attribute && attributeName) {
            btn.setAttribute(attribute, attributeName);
        }
        return btn;
    };

    const createImg = (parent, src, attribute, attributeName) => {
        const img = document.createElement('img');
        img.src = src;
        if (attribute && attributeName) {
            img.setAttribute(attribute, attributeName);
        }
        if (parent) {
            parent.appendChild(img);
        }
        return img;
    };

    // const createInputText = (parent, labelText, labelVisibility, attribute, attributeName) => {
    //     const inputWrapper = document.createElement('div');
    //     inputWrapper.setAttribute(attribute, attributeName);

    //     const label = document.createElement('label');
    //     label.textContent = labelText;
    //     label.className = labelVisibility ? '' : 'hide-label';

    //     const inputText = document.createElement('input');
    //     inputText.type = 'text';

    //     inputWrapper.append(label, inputText);
    //     parent.appendChild(inputWrapper);

    //     return inputText;
    // };

    const createLabel = (parent, text, attribute, attributeName) => {
        const label = document.createElement('label');
        label.textContent = text;
        if (attribute && attributeName) {
            label.setAttribute(attribute, attributeName);
        }
        if (parent) {
            parent.appendChild(label);
        }
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
        // checkbox.name = 'checkStatus';
        // checkbox.id = 'checkbox';

        if (parent) {
            parent.appendChild(checkbox);
        }

        return checkbox;
    };

    const createSelectProject = (parent, todo) => {
        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-project-wrapper');

        const svg = document.createElement('div');
        svg.classList.add('select-project-svg');

        const selectProject = document.createElement('select');
        selectProject.classList.add('select-project');
        // selectProject.id = 'project-select';

        const projectInstancesArray = projectInstances.getInstances();

        // let selectedValue;

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
            // console.log(e.target.value);
            // console.log(selectProject.value);
            // selectedValue = e.target.value;

            if (todo) {
                todo.setProject(e.target.value);
            }
        });
        selectWrapper.append(svg, selectProject);

        if (parent) {
            parent.appendChild(selectWrapper);
        }

        // console.log(selectedValue);
        return selectWrapper;
    };

    return {
        createDiv,
        createH,
        createP,
        createBtn,
        createImg,
        // createInputText,
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
