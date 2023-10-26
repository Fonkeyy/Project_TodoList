import { dom, focusDown } from './global';

import '../CSS-files/todoCard.css';
import { projectInstances } from './ProjectClass';

export { toDoCard };

const toDoCard = (() => {
    const displayCard = async (todo) => {
        try {
            const projectName = todo.getProjectName();
            const project = projectInstances
                .getInstances()
                .find((project) => project.getName() === projectName);
            const todoList = project.getList();
            const index = todoList.indexOf(todo);

            const $card = dom.createDiv(document.body, 'id', 'card');
            $card.classList.toggle('opacity');
            const $cardContent = dom.createDiv($card, 'id', 'card-content');

            // * header-content
            const $headerContent = dom.createDiv($cardContent, 'class', 'header-content');
            const $headerContentLeft = dom.createDiv($headerContent, 'id', 'header-content-left');
            const $headerContentRight = dom.createDiv($headerContent, 'id', 'header-content-right');

            // * Project name
            if (projectName === 'default') {
                const $projectNameSvg = dom.createDiv($headerContentLeft, 'class', 'svg-card');
                $projectNameSvg.id = 'project-name-svg';
            }
            const headerProjectName = dom.createP($headerContentLeft, projectName);

            // * Next button
            const $nextBtn = dom.createBtn($headerContentRight, 'button', 'class', 'next-btn');
            $nextBtn.classList.add('header-card-btn');
            $nextBtn.addEventListener('click', async () => {
                clearCard();

                let nextIndex = (index + 1) % todoList.length;
                if (nextIndex < 0) {
                    nextIndex = todoList.length - 1;
                }

                const nextTodo = todoList[nextIndex];
                await displayCard(nextTodo);
            });

            // * Previous button
            const $previousBtn = dom.createBtn($headerContentRight, 'button', 'class', 'previous-btn');
            $previousBtn.classList.add('header-card-btn');
            $previousBtn.addEventListener('click', async () => {
                clearCard();

                let prevIndex = (index - 1) % todoList.length;
                if (prevIndex < 0) {
                    prevIndex = todoList.length - 1;
                }

                const prevTodo = todoList[prevIndex];
                await displayCard(prevTodo);
            });

            // * More button
            const $moreBtn = dom.createBtn($headerContentRight, 'button', 'class', 'more-btn');
            $moreBtn.classList.add('header-card-btn');
            $moreBtn.addEventListener('click', (e) => {
                e.preventDefault();
            });

            // * Close button
            const $closeBtn = dom.createBtn($headerContentRight, 'button', 'class', 'close-btn');
            $closeBtn.classList.add('header-card-btn');
            $closeBtn.addEventListener('click', () => {
                clearCard();
                focusDown();
            });

            // * Main-content
            const $mainContent = dom.createDiv($cardContent, 'id', 'todo-card-content');

            // * Title
            const $titleContainer = dom.createDiv($mainContent, 'id', 'title-container');
            dom.createCheckbox($titleContainer, todo.getPriority());
            dom.createH($titleContainer, todo.getTitle(), 2);

            // * Description
            const $todoDescriptionContainer = dom.createDiv($mainContent, 'id', 'todo-description-container');
            const $descriptionSvg = dom.createDiv($todoDescriptionContainer, 'class', 'svg-card');
            $descriptionSvg.id = 'description-svg';
            dom.createP($todoDescriptionContainer, todo.getDescription(), 'class', 'todo-description');

            // * Project
            const $projectNameContainer = dom.createDiv($mainContent, 'id', 'project-name-container');
            dom.createH($projectNameContainer, 'Project', 4);
            const select = dom.createSelectProject($projectNameContainer, todo);
            select.selectProject.addEventListener('change', () => {
                headerProjectName.textContent = select.selectProject.value;
            });

            // * Due date
            const $dueDateContainer = dom.createDiv($mainContent, 'id', 'due-date-container');
            $dueDateContainer.classList.add('due-container');
            const $dueDateSvg = dom.createDiv($dueDateContainer, 'class', 'svg-card');
            $dueDateSvg.id = 'due-date-svg';
            dom.createH($dueDateContainer, 'Due Date', 4);
            const dateP = dom.createP($dueDateContainer, todo.getDueDate());

            dateP.addEventListener('click', () => {
                const todoInputDate = document.querySelector('#todo-input-date');

                if (todoInputDate) {
                    todoInputDate.remove();
                    dateP.classList.toggle('display-none');
                } else {
                    dateP.classList.toggle('display-none');
                    const datePicker = dom.createDatePicker(todo);
                    $dueDateContainer.appendChild(datePicker);

                    datePicker.addEventListener('change', () => {
                        datePicker.remove();
                        dateP.textContent = todo.getDueDate();
                        dateP.classList.toggle('display-none');
                    });
                }
            });

            // * Priority
            const $priorityContainer = dom.createDiv($mainContent, 'id', 'priority-container');
            $priorityContainer.classList.add('due-container');
            const $prioritySvg = dom.createDiv($priorityContainer, 'class', 'svg-card');
            $prioritySvg.id = 'priority-svg';
            dom.createLabel($priorityContainer, 'Priority');

            const priorityP = dom.createP($priorityContainer, `P${todo.getPriority()}`, 'id', 'priority-p');
            priorityP.addEventListener('click', () => {
                const dialog = document.querySelector('#priority-dialog');
                if (dialog) {
                    dialog.close();
                    dialog.remove();
                } else {
                    const dialog = $priorityContainer.appendChild(dom.createSelectDialog(todo));
                    dialog.show();
                }
            });

            // * Comment
            dom.createP($mainContent, todo.getComment(), 'class', 'todo-comment');
        } catch (error) {
            console.error(error);
        }
    };

    const clearCard = () => {
        const $card = document.querySelector('#card');
        if ($card) {
            $card.remove();
        }
    };

    return { displayCard, clearCard };
})();
