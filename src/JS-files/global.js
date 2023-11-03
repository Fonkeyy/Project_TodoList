import { projectInstances } from './ProjectClass';
import '../CSS-files/global.css';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import { storageService } from './storageService';

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

    const createBtn = (parent = null, type = 'button', attribute, attributeName, text, label) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', label);
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

    const createCheckbox = (priority, parent, ariaLabel) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.ariaLabel = ariaLabel;
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
                .filter((project) => project.name != todo.getProjectName())
                .forEach((project) => {
                    const option = document.createElement('option');
                    option.textContent = project.name;
                    selectProject.appendChild(option);
                });
        } else {
            projectInstancesArray.forEach((project) => {
                const option = document.createElement('option');
                option.textContent = project.name;
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

    const createSelectPriority = (onPriorityChange, todo) => {
        const initialValues = [
            { level: '1', svgClass: 'priority-1', current: false },
            { level: '2', svgClass: 'priority-2', current: false },
            { level: '3', svgClass: 'priority-3', current: false },
            { level: '4', svgClass: 'priority-4', current: false },
        ];

        const findSelectedPriority = (todo) => (todo ? todo.getPriority() : '4');

        const $priorityContainer = document.createElement('div');
        $priorityContainer.id = 'priority-container';
        $priorityContainer.tabIndex = 0;
        $priorityContainer.classList.add('due-container');

        dom.createH($priorityContainer, 'Priority', 4);
        const duePriorityWrapper = dom.createDiv($priorityContainer, 'class', 'due-wrapper');
        const svg = dom.createDiv(duePriorityWrapper, 'class', `svg priority-${findSelectedPriority(todo)}`);
        const priorityP = dom.createP(
            duePriorityWrapper,
            `P${findSelectedPriority(todo)}`,
            'id',
            'priority-p'
        );

        const handle$priorityContainerClick = () => {
            const dialog = document.querySelector('#priority-dialog');
            if (dialog) {
                dialog.close();
                dialog.remove();
            } else {
                const dialog = $priorityContainer.appendChild(createPriorityDialog(todo));
                dialog.show();
            }
        };

        $priorityContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handle$priorityContainerClick();
            }
        });

        $priorityContainer.addEventListener('click', () => {
            handle$priorityContainerClick();
        });

        const createPriorityDialog = (todo) => {
            const selectPriorityDialog = document.createElement('dialog');
            selectPriorityDialog.id = 'priority-dialog';

            for (let priority of initialValues) {
                const priorityWrapper = dom.createDiv(selectPriorityDialog, 'class', 'priority-wrapper');
                priorityWrapper.tabIndex = 0;

                dom.createDiv(priorityWrapper, 'class', `svg ${priority.svgClass}`);
                dom.createP(priorityWrapper, `Priority ${priority.level}`);

                if (todo) {
                    priority.current = priority.level === findSelectedPriority(todo);
                } else {
                    priority.current = priority.level === priorityP.textContent.slice(-1);
                }

                if (priority.current) {
                    dom.createDiv(priorityWrapper, 'class', 'flag priority-check');
                }

                const handlePriorityWrapperClick = () => {
                    priorityP.textContent = `P${priority.level}`;
                    svg.className = `svg priority-${priority.level}`;

                    if (todo) {
                        todo.setPriority(priority.level);
                    } else if (onPriorityChange) {
                        onPriorityChange(priority.level);
                    }
                };

                priorityWrapper.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handlePriorityWrapperClick();
                    }
                });

                priorityWrapper.addEventListener('click', () => {
                    handlePriorityWrapperClick();
                });
            }
            selectPriorityDialog.remove();
            selectPriorityDialog.close();

            return selectPriorityDialog;
        };

        return { $priorityContainer };
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
        const addTodoBtn = document.createElement('button');
        addTodoBtn.className = 'card-btn add-btn';
        addTodoBtn.textContent = 'Add task';

        // * Button wrapper
        const buttonWrapper = document.createElement('div');
        buttonWrapper.append(cancelBtn, addTodoBtn);

        return { cancelBtn, addTodoBtn, buttonWrapper };
    };

    const createDropDown = (todo) => {
        const dialog = document.createElement('dialog');
        dialog.classList.add('drop-down-dialog');
        const dropDownDeleteWrapper = dom.createDiv(dialog, 'class', 'drop-down-delete-wrapper');
        dom.createDiv(dropDownDeleteWrapper, 'class', 'svg delete-svg');
        dom.createBtn(dropDownDeleteWrapper, 'button', null, null, 'Delete task...');

        dropDownDeleteWrapper.addEventListener('click', (e) => {
            e.stopPropagation();
            const project = todo.getProject();
            project.removeTodo(todo);
            dialog.close();
            dialog.remove();
            if (document.querySelector('.dialog-modal')) {
                document.querySelector('.dialog-modal').close();
                document.querySelector('.dialog-modal').remove();
            }
            todo.setProjectName(null);
            sidebar.update();
            todoList.update(todo.getProject());

            const newData = project.list.filter((item) => item.name !== todo.name);
            project.list = newData;
            storageService.set(`${project.name}`, JSON.stringify(project));
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
