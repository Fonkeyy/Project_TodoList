import { projectInstances } from './ProjectClass';
import '../CSS-files/global.css';
import { sidebar } from './sidebar';
import { todoList } from './todoList';

export const dom = (() => {
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
            { level: '1', svgClass: 'priority-1', current: false },
            { level: '2', svgClass: 'priority-2', current: false },
            { level: '3', svgClass: 'priority-3', current: false },
            { level: '4', svgClass: 'priority-4', current: false },
        ];

        const findSelectedPriority = () => (todo ? todo.getPriority() : '4');
        let selectedPriorityLevel = findSelectedPriority();

        const $priorityContainer = document.createElement('div');
        $priorityContainer.id = 'priority-container';
        $priorityContainer.classList.add('due-container');
        dom.createH($priorityContainer, 'Priority', 4);
        const duePriorityWrapper = dom.createDiv($priorityContainer, 'class', 'due-wrapper');
        const svg = dom.createDiv(duePriorityWrapper, 'class', `svg priority-${findSelectedPriority()}`);
        const priorityP = dom.createP(duePriorityWrapper, `P${findSelectedPriority()}`, 'id', 'priority-p');

        priorityP.addEventListener('click', () => {
            const dialog = document.querySelector('#priority-dialog');
            if (dialog) {
                dialog.close();
                dialog.remove();
            } else {
                const dialog = $priorityContainer.appendChild(
                    createPriorityDialog(todo).selectPriorityDialog
                );
                dialog.show();
                dialog.addEventListener('click', () => {
                    svg.className = `svg priority-${findSelectedPriority()}`;
                });
            }
        });

        const createPriorityDialog = (todo) => {
            const selectPriorityDialog = document.createElement('dialog');
            selectPriorityDialog.id = 'priority-dialog';

            for (let priority of initialValues) {
                const priorityWrapper = dom.createDiv(selectPriorityDialog, 'class', 'priority-wrapper');
                dom.createDiv(priorityWrapper, 'class', `svg ${priority.svgClass}`);
                dom.createP(priorityWrapper, `Priority ${priority.level}`);
                priority.current = priority.level === findSelectedPriority();
                if (priority.current) {
                    dom.createDiv(priorityWrapper, 'class', 'flag priority-check');
                }

                priorityWrapper.addEventListener('click', () => {
                    priorityP.textContent = `P${priority.level}`;
                    svg.className = `svg priority-${findSelectedPriority()}`;

                    selectPriorityDialog.close();
                    selectPriorityDialog.remove();

                    if (todo) {
                        todo.setPriority(priority.level);
                    } else {
                        selectedPriorityLevel = priority.level;
                        priority.current = true;
                        return selectedPriorityLevel;
                    }
                    console.log(todo);
                    console.log(todo.getPriority());
                    console.log(priority);
                });
            }

            // // // todo => fix close dialog
            // // selectPriorityDialog.addEventListener('click', (e) => {
            // //     const dialogDimensions = selectPriorityDialog.getBoundingClientRect();
            // //     if (
            // //         e.clientX < dialogDimensions.left ||
            // //         e.clientX > dialogDimensions.right ||
            // //         e.clientY < dialogDimensions.top ||
            // //         e.clientY > dialogDimensions.bottom
            // //     ) {
            // //         selectPriorityDialog.close();
            // //         selectPriorityDialog.remove();
            // //     }
            // // });
            return { selectPriorityDialog };
        };
        return { $priorityContainer, selectedPriorityLevel };
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
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'card-btn cancel-btn';
        cancelBtn.textContent = 'Cancel';

        // * Add task button
        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'card-btn add-btn';
        addTaskBtn.textContent = 'Add task';

        // * Button wrapper
        const buttonWrapper = document.createElement('div');
        buttonWrapper.append(cancelBtn, addTaskBtn);

        return { cancelBtn, addTaskBtn, buttonWrapper };
    };

    const createDropDown = (todo) => {
        const dialog = document.createElement('dialog');
        dialog.classList.add('drop-down-dialog');
        const dropDownDeleteWrapper = dom.createDiv(dialog, 'class', 'drop-down-delete-wrapper');
        dom.createDiv(dropDownDeleteWrapper, 'class', 'svg delete-svg');
        dom.createBtn(dropDownDeleteWrapper, 'button', null, null, 'Delete task...');

        dropDownDeleteWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            todo.getProject().removeTodo(todo);
            dialog.close();
            dialog.remove();
            if (document.querySelector('.dialog-modal')) {
                document.querySelector('.dialog-modal').close();
                document.querySelector('.dialog-modal').remove();
            }
            todo.setProjectName(null);
            sidebar.update();
            todoList.update(todo.getProject());
        });
        dialog.show();
        return dialog;
    };

    const createDialogModal = (child) => {
        const dialog = document.createElement('dialog');
        dialog.classList.add('dialog-modal');
        dialog.appendChild(child);
        document.body.appendChild(dialog);
        dialog.showModal();
    };

    return {
        createDiv,
        createH,
        createP,
        createBtn,
        createImg,
        createLabel,
        createCheckbox,
        createSelectProject,
        createSelectPriority,
        createDatePicker,
        createButtonWrapper,
        createDropDown,
        createDialogModal,
    };
})();
