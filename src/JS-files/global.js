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

    const createBtn = (parent = null, type = 'button', attribute, attributeName, text) => {
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
            case '1':
                checkbox.className = 'P1';
                break;
            case '2':
                checkbox.className = 'P2';
                break;
            case '3':
                checkbox.className = 'P3';
                break;
            case '4':
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

    const createSelectPriority = (todo) => {
        const initialValues = [
            { level: '1', svgClass: 'priority-1', current: todo ? todo.getPriority() === '1' : false },
            { level: '2', svgClass: 'priority-2', current: todo ? todo.getPriority() === '2' : false },
            { level: '3', svgClass: 'priority-3', current: todo ? todo.getPriority() === '3' : false },
            { level: '4', svgClass: 'priority-4', current: todo ? todo.getPriority() === '4' : true },
        ];
        const todoSelectDialog = document.createElement('dialog');
        todoSelectDialog.id = 'priority-dialog';

        for (let priority of initialValues) {
            const priorityWrapper = dom.createDiv(todoSelectDialog, 'class', 'priority-wrapper');
            dom.createDiv(priorityWrapper, 'class', `svg ${priority.svgClass}`);
            dom.createP(priorityWrapper, `Priority ${priority.level}`);
            if (priority.current) {
                dom.createDiv(priorityWrapper, 'class', 'flag priority-check');
            }

            priorityWrapper.addEventListener('click', () => {
                if (todo) {
                    todo.setPriority(priority.level);
                }

                const priorityP = document.querySelector('#priority-p');
                priorityP.textContent = `P${priority.level}`;
                todoSelectDialog.close();
                todoSelectDialog.remove();
                todo.setPriority(priority.level);
            });
        }

        // todo => fix close dialog
        todoSelectDialog.addEventListener('click', (e) => {
            const dialogDimensions = todoSelectDialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                todoSelectDialog.close();
                todoSelectDialog.remove();
            }
        });
        return todoSelectDialog;
    };

    const createDatePicker = (todo) => {
        const todoInputDate = document.createElement('input');
        todoInputDate.setAttribute('type', 'date');
        todoInputDate.id = 'todo-input-date';

        if (todo) {
            todoInputDate.setAttribute('value', todo.getDueDate());
        }

        todoInputDate.addEventListener('change', (e) => {
            todo.setDueDate(e.target.value);
        });

        return todoInputDate;
    };

    const createButtonWrapper = () => {
        // * Cancel button
        // const cancelBtn = dom.createBtn('button', 'class', 'card-btn cancel-btn', 'Cancel');
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'card-btn cancel-btn';
        cancelBtn.textContent = 'Cancel';

        // * Add task button
        // const addTaskBtn = dom.createBtn('button', 'class', 'card-btn add-btn', 'Add task');
        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'card-btn add-btn';
        addTaskBtn.textContent = 'Add task';

        // * Button wrapper
        const buttonWrapper = document.createElement('div');
        buttonWrapper.append(cancelBtn, addTaskBtn);

        return { cancelBtn, addTaskBtn, buttonWrapper };
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
        createSelectPriority,
        createDatePicker,
        createButtonWrapper,
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
