import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { todoList } from './todoList';
import { addProjectCard } from './addProjectCard';
export { sidebar };

import '../CSS-files/sidebar.css';
import '../CSS-files/global.css';

const sidebar = (() => {
    const display = () => {
        const sidebar = document.querySelector('.sidebar');
        const sideBarProjectContainer = dom.createDiv(sidebar, 'id', 'sidebar-project-container');

        // * Create title container
        const sideBarProjectContainerTitle = dom.createDiv(
            sideBarProjectContainer,
            'id',
            'sidebar-project-container-title'
        );

        // * Add title style
        sideBarProjectContainerTitle.addEventListener('mouseenter', () => {
            sideBarProjectContainerTitle.classList.toggle('grey-hover');
        });
        sideBarProjectContainerTitle.addEventListener('mouseleave', () => {
            sideBarProjectContainerTitle.classList.toggle('grey-hover');
        });
        dom.createH(sideBarProjectContainerTitle, 'Projects', 3);
        const $addProjectBtn = dom.createBtn(sideBarProjectContainerTitle, 'button');

        // * Add 'add' btn style
        sidebar.addEventListener('mouseenter', () => {
            $addProjectBtn.classList.add('opacity');
        });
        sidebar.addEventListener('mouseleave', () => {
            $addProjectBtn.classList.remove('opacity');
        });

        $addProjectBtn.addEventListener('click', () => {
            addProjectCard.displayCard();
        });

        // * Create project items
        // if (typeof(Storage) !== "undefined") {
        //     // Local storage is supported
        // } else {
        //     // Local storage is not supported
        // }

        projectInstances.getInstances().forEach((project) => {
            const $projectItemContainer = dom.createDiv(
                sideBarProjectContainer,
                'class',
                'project-container'
            );
            dom.createP($projectItemContainer, `${project.getName()}`, 'class', 'project-name');
            dom.createP($projectItemContainer, `${project.getLength()}`, 'class', 'project-length');
            const $deleteBtn = dom.createBtn($projectItemContainer, 'button', 'id', 'delete-btn');
            $deleteBtn.classList.add('display-none');

            // * Add project items style
            $projectItemContainer.addEventListener('mouseenter', (event) => {
                event.currentTarget.classList.toggle('grey-hover');
                event.currentTarget.querySelector('.project-length').classList.toggle('display-none');
                event.currentTarget.querySelector('#delete-btn').classList.toggle('display-none');
            });
            $projectItemContainer.addEventListener('mouseleave', (event) => {
                event.currentTarget.classList.toggle('grey-hover');
                event.currentTarget.querySelector('.project-length').classList.toggle('display-none');
                event.currentTarget.querySelector('#delete-btn').classList.toggle('display-none');
            });

            // * Add project items event listener
            $projectItemContainer.addEventListener('click', (e) => displayProject(e));

            const displayProject = (e) => {
                const projectName = e.target.closest('div').querySelector('.project-name').textContent;
                const project = projectInstances
                    .getInstances()
                    .find((project) => project.getName() === projectName);
                const $main = document.querySelector('#main-content');
                const $todoList = document.querySelector('#todo-list');
                if ($todoList) {
                    $todoList.remove();
                }
                $main.appendChild(todoList.display(project));
            };

            // * Add delete btn event listener
            $deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const name = e.currentTarget.parentElement.querySelector('.project-name').textContent;
                const project = projectInstances.getInstances().find((project) => project.getName() === name);

                projectInstances.removeInstance(project);

                const container = e.currentTarget.closest('.project-container');
                if (container) {
                    container.remove();
                }

                const $todoList = document.querySelector('#todo-list');
                if ($todoList) {
                    $todoList.remove();
                }

                const $main = document.querySelector('main');
                const project0 = projectInstances.getInstances()[0];

                if (projectInstances.getLength() > 0) {
                    $main.appendChild(todoList.display(project0));
                }
            });
        });

        return sidebar;
    };

    const update = () => {
        const sidebarProjectContainer = document.querySelector('#sidebar-project-container');
        sidebarProjectContainer.remove();
        display();
    };

    return { display, update };
})();
