import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
import { storageService } from './storageService';
import '../CSS-files/todoCard.css';

export { toDoCard };

const toDoCard = (() => {
    const displayCard = (todo) => {
        const projectName = todo.getProjectName();
        const project = todo.getProject();
        const todoList1 = project.getList();
        const index = todoList1.indexOf(todo);
        const $card = dom.createDiv(null, 'id', 'todo-card');
        const $cardContent = dom.createDiv($card, 'id', 'card-content');

        // * header-content
        const $headerContent = dom.createDiv($cardContent, 'id', 'todo-header-content');
        const $headerContentLeft = dom.createDiv($headerContent, 'id', 'todo-header-content-left');
        const $headerContentRight = dom.createDiv($headerContent, 'id', 'todo-header-content-right');

        // * Project name
        const headerProjectName = dom.createP($headerContentLeft, projectName);

        // * Next button
        const $nextBtn = dom.createBtn(
            $headerContentRight,
            'button',
            'class',
            'header-card-btn next-btn',
            null,
            'next todo'
        );

        const handleNextBtnClick = (sign) => {
            clearCard();
            let nextIndex = sign === '+' ? index + 1 : index - (1 % todoList1.length);
            if (nextIndex < 0) {
                nextIndex = todoList1.length - 1;
            }
            const nextTodo = todoList1[nextIndex];
            document.querySelector('.dialog-modal').remove();
            displayCard(nextTodo);
        };

        $nextBtn.addEventListener('click', () => {
            handleNextBtnClick('+');
        });

        // * Previous button
        const $previousBtn = dom.createBtn(
            $headerContentRight,
            'button',
            'class',
            ' header-card-btn previous-btn',
            null,
            'previous todo'
        );

        $previousBtn.addEventListener('click', () => {
            handleNextBtnClick('-');
        });

        // * More button
        const $moreBtn = dom.createBtn(
            $headerContentRight,
            'button',
            'class',
            'header-card-btn more-btn',
            null,
            'more options'
        );
        $moreBtn.addEventListener('click', () => {
            $headerContentRight.append(dom.createDropDown(todo));
        });

        // * Close button
        const $closeBtn = dom.createBtn(
            $headerContentRight,
            'button',
            'class',
            'header-card-btn close-btn',
            null,
            `close todo ${todo.name}`
        );
        $closeBtn.addEventListener('click', () => {
            document.querySelector('.dialog-modal').close();
            document.querySelector('.dialog-modal').remove();
            todoList.update(todo.getProject());
            storageService.set('instances', JSON.stringify(projectInstances.getInstances()));
        });

        // * Main-content
        const $mainContent = dom.createDiv($cardContent, 'id', 'todo-card-content');

        // * Checkbox
        const $titleContainer = dom.createDiv($mainContent, 'id', 'title-container');

        const checkbox = dom.createCheckbox(todo.getPriority(), $titleContainer, 'check if todo is done');

        checkbox.addEventListener('click', () => {
            project.removeTodo(todo);
            todoList.update(project);
            todo.setProjectName('Archives');
            const archive = projectInstances.getInstances().find((project) => project.name === 'Archives');
            archive.addNewTodo(todo);
            sidebar.update();
            handleNextBtnClick('+');

            storageService.set('instances', JSON.stringify(projectInstances.getInstances()));
        });

        // * Title
        dom.createH($titleContainer, todo.name, 2);

        // * Description
        const $todoDescriptionContainer = dom.createDiv($mainContent, 'id', 'todo-description-container');
        dom.createDiv($todoDescriptionContainer, 'class', 'svg description-svg');
        const descriptionP = dom.createP(
            $todoDescriptionContainer,
            todo.getDescription(),
            'class',
            'todo-description'
        );

        descriptionP.addEventListener('click', () => {
            descriptionP.classList.add('display-none');
            const textarea = document.createElement('input');
            textarea.type = 'textarea';
            textarea.classList.add('todo-card-textarea');
            textarea.value = todo.getDescription();

            const { cancelBtn, addTaskBtn, buttonWrapper } = dom.createButtonWrapper();

            addTaskBtn.textContent = 'Save';

            cancelBtn.addEventListener('click', () => {
                descriptionP.classList.remove('display-none');
                textarea.remove();
                buttonWrapper.remove();
            });

            addTaskBtn.addEventListener('click', () => {
                todo.setDescription(textarea.value);
                descriptionP.textContent = textarea.value;
                descriptionP.classList.toggle('display-none');
                textarea.remove();
                buttonWrapper.remove();
            });
            $todoDescriptionContainer.append(textarea, buttonWrapper);
        });

        // * Project
        const $projectNameContainer = dom.createDiv($mainContent, 'id', 'project-name-container');
        $projectNameContainer.classList.add('due-container');
        dom.createH($projectNameContainer, 'Project', 4);
        const select = dom.createSelectProject($projectNameContainer, todo);
        select.selectProject.addEventListener('change', () => {
            headerProjectName.textContent = select.selectProject.value;
        });

        // * Due date
        const $dueDateContainer = dom.createDiv($mainContent, 'id', 'due-date-container');
        $dueDateContainer.classList.add('due-container');
        dom.createH($dueDateContainer, 'Due Date', 4);
        const dueDateWrapper = dom.createDiv($dueDateContainer, 'class', 'due-wrapper');
        dom.createDiv(dueDateWrapper, 'class', 'svg due-date-svg');
        const dueDate = todo.getDueDate() ? todo.getDueDate().toDateString() : '';
        const dateP = dom.createP(dueDateWrapper, dueDate);

        dueDateWrapper.addEventListener('click', () => {
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
                    dateP.textContent = todo.getDueDate().toDateString();
                    dateP.classList.toggle('display-none');
                });
            }
        });

        // * Priority
        const { $priorityContainer } = dom.createSelectPriority(null, todo);

        $mainContent.appendChild($priorityContainer);

        $priorityContainer.addEventListener('click', () => {
            checkbox.className = `P${todo.getPriority()}`;
        });

        // * Comment
        dom.createP($mainContent, todo.getComment(), 'class', 'todo-comment');
        dom.createDialogModal($card);
    };

    const clearCard = () => {
        const $card = document.querySelector('#card');
        if ($card) {
            $card.remove();
        }
    };

    return { displayCard, clearCard };
})();
