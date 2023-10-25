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

        const projectInstancesArray = projectInstances.getInstances();

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
            if (todo) {
                todo.setProject(e.target.value);
            }
        });
        selectWrapper.append(svg, selectProject);

        if (parent) {
            parent.appendChild(selectWrapper);
        }
        return { selectWrapper, selectProject };
    };

    const createSelectDialog = (item) => {
        const initialValues = [
            { level: '1', svgClass: 'red-flag', current: item ? item.getPriority() === '1' : false },
            { level: '2', svgClass: 'orange-flag', current: item ? item.getPriority() === '2' : false },
            { level: '3', svgClass: 'blue-flag', current: item ? item.getPriority() === '3' : false },
            { level: '4', svgClass: 'white-flag', current: item ? item.getPriority() === '4' : true },
        ];
        const todoSelectDialog = document.createElement('dialog');
        todoSelectDialog.id = 'priority-dialog';

        for (let priority of initialValues) {
            const priorityWrapper = dom.createDiv(todoSelectDialog, 'class', 'priority-wrapper');
            dom.createDiv(priorityWrapper, 'class', `flag-svg ${priority.svgClass}`);
            dom.createP(priorityWrapper, `Priority ${priority.level}`);
            if (priority.current) {
                dom.createDiv(priorityWrapper, 'class', 'flag priority-check');
            }

            priorityWrapper.addEventListener('click', () => {
                if (item) {
                    item.setPriority(priority.level);
                }

                const priorityP = document.querySelector('#priority-p');
                priorityP.textContent = `P${priority.level}`;
                todoSelectDialog.close();
                todoSelectDialog.remove();
            });
        }
        return todoSelectDialog;
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
        createSelectDialog,
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
