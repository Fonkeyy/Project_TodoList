import { dom } from './global';
import '../CSS-files/todoCard.css';
import { projectInstances } from './ProjectClass';
import { sidebar } from './sidebar';
import { todoList } from './todoList';
// import { todoList } from './todoList';

export { toDoCard };

const toDoCard = (() => {
    const displayCard = async (todo) => {
        try {
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
            if (projectName === 'default') {
                dom.createDiv($headerContentLeft, 'class', 'svg select-project-svg');
            }
            const headerProjectName = dom.createP($headerContentLeft, projectName);

            // * Next button
            const $nextBtn = dom.createBtn(
                $headerContentRight,
                'button',
                'class',
                'header-card-btn next-btn'
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
                ' header-card-btn previous-btn'
            );

            $previousBtn.addEventListener('click', () => {
                handleNextBtnClick('-');
            });

            // * More button
            const $moreBtn = dom.createBtn(
                $headerContentRight,
                'button',
                'class',
                'header-card-btn more-btn'
            );
            $moreBtn.addEventListener('click', () => {
                $headerContentRight.append(dom.createDropDown(todo));
            });

            // * Close button
            const $closeBtn = dom.createBtn(
                $headerContentRight,
                'button',
                'class',
                'header-card-btn close-btn'
            );
            $closeBtn.addEventListener('click', () => {
                document.querySelector('.dialog-modal').close();
                document.querySelector('.dialog-modal').remove();
            });

            // * Main-content
            const $mainContent = dom.createDiv($cardContent, 'id', 'todo-card-content');

            // * Checkbox
            const $titleContainer = dom.createDiv($mainContent, 'id', 'title-container');
            const checkbox = dom.createCheckbox($titleContainer, todo.getPriority());

            checkbox.addEventListener('click', () => {
                project.removeTodo(todo);
                todoList.update(project);
                todo.setProject('Archive');
                const archive = projectInstances
                    .getInstances()
                    .find((project) => project.getName() === 'Archive');
                archive.addNewTodo(todo);
                sidebar.update();
                handleNextBtnClick('+');
            });

            // * Title
            dom.createH($titleContainer, todo.getName(), 2);

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
            const dateP = dom.createP(dueDateWrapper, todo.getDueDate());

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
            const priority = dom.createSelectPriority(todo).$priorityContainer;
            $mainContent.appendChild(priority);

            // * Comment
            dom.createP($mainContent, todo.getComment(), 'class', 'todo-comment');

            dom.createDialogModal($card);
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
