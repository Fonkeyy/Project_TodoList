import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { todoList } from './todoList';
import { addProjectCard } from './projectAddCard';
import { storageService } from './storageService';
import '../CSS-files/sidebar.css';
import '../CSS-files/global.css';

export { sidebar };

const sidebar = (() => {
    const display = () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth < '750') {
            sidebar.classList.add('translate-sidebar');
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth < '750') {
                sidebar.classList.add('translate-sidebar');
            } else {
                sidebar.classList.remove('translate-sidebar');
            }
        });
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

        // * Add project button
        const $addProjectBtn = dom.createBtn(
            sideBarProjectContainerTitle,
            'button',
            null,
            null,
            null,
            'add new project'
        );

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
        projectInstances.getInstances().forEach((project) => {
            const $projectItemContainer = dom.createDiv(
                sideBarProjectContainer,
                'class',
                'project-container'
            );
            dom.createP($projectItemContainer, `${project.name}`, 'class', 'project-name');
            dom.createP($projectItemContainer, `${project.list.length}`, 'class', 'project-length');

            // * Add delete btn
            if (project.name !== 'Archives') {
                const $deleteBtn = dom.createBtn(
                    $projectItemContainer,
                    'button',
                    'id',
                    'delete-btn',
                    null,
                    `delete ${project.name}`
                );
                $deleteBtn.classList.add('display-none');

                // * Add delete btn event listener
                $deleteBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const name = e.currentTarget.parentElement.querySelector('.project-name').textContent;
                    const project = projectInstances.getInstances().find((project) => project.name === name);

                    projectInstances.removeInstance(project);
                    storageService.set('instances', JSON.stringify(projectInstances.getInstances()));

                    const container = e.currentTarget.closest('.project-container');
                    if (container) {
                        container.remove();
                    }

                    const $todoList = document.querySelector('#todo-list');
                    if ($todoList) {
                        const project0 = projectInstances.getInstances()[0];
                        todoList.update(project0);
                    }
                });
            }

            // * Add project items style
            $projectItemContainer.addEventListener('mouseenter', (event) => {
                event.currentTarget.classList.toggle('grey-hover');
                event.currentTarget.querySelector('.project-length').classList.toggle('display-none');
                if (event.currentTarget.querySelector('#delete-btn')) {
                    event.currentTarget.querySelector('#delete-btn').classList.toggle('display-none');
                }
            });
            $projectItemContainer.addEventListener('mouseleave', (event) => {
                event.currentTarget.classList.toggle('grey-hover');
                event.currentTarget.querySelector('.project-length').classList.toggle('display-none');
                if (event.currentTarget.querySelector('#delete-btn')) {
                    event.currentTarget.querySelector('#delete-btn').classList.toggle('display-none');
                }
            });

            // * Add project items event listener
            $projectItemContainer.addEventListener('click', (e) => displayProject(e));

            const displayProject = (e) => {
                const projectName = e.target.closest('div').querySelector('.project-name').textContent;

                const project = projectInstances
                    .getInstances()
                    .find((project) => project.name === projectName);

                const $main = document.querySelector('#main-content');
                const $todoList = document.querySelector('#todo-list');
                if ($todoList) {
                    $todoList.remove();
                }
                $main.appendChild(todoList.display(project));
            };
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
