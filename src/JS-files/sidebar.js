import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { displayItemList } from './homePage';
import '../CSS-files/global.css';
export { displaySidebar };

const displaySidebar = () => {
    const $sidebar = document.createElement('div');
    $sidebar.classList.add('sidebar');

    //todo add function sidebar resize

    const $sideBarProjectContainer = dom.createDiv($sidebar, 'id', 'side-project-container');

    //Create title container
    const $sideBarProjectContainerTitle = dom.createDiv(
        $sideBarProjectContainer,
        'id',
        'sidebar-project-container-title'
    );

    // Add title style
    $sideBarProjectContainerTitle.addEventListener('mouseover', () => {
        $sideBarProjectContainerTitle.classList.toggle('grey-hover');
    });
    $sideBarProjectContainerTitle.addEventListener('mouseout', () => {
        $sideBarProjectContainerTitle.classList.toggle('grey-hover');
    });
    dom.createH($sideBarProjectContainerTitle, 'Projects', 3);
    const $addProjectBtn = dom.createBtn($sideBarProjectContainerTitle, 'button');
    // Add 'add' btn style
    $sidebar.addEventListener('mouseover', () => {
        $addProjectBtn.classList.toggle('opacity');
    });
    $sidebar.addEventListener('mouseout', () => {
        $addProjectBtn.classList.toggle('opacity');
    });

    $addProjectBtn.addEventListener('click', () => {}); //todo => add function listeners

    // Create project items
    projectInstances.getInstances().forEach((project) => {
        const $projectItemContainer = dom.createDiv(
            $sideBarProjectContainer,
            'class',
            'project-container'
        );
        dom.createP($projectItemContainer, `${project.getName()}`, 'class', 'project-name');
        dom.createP($projectItemContainer, `${project.getLength()}`, 'class', 'project-length');
        const $deleteBtn = dom.createBtn($projectItemContainer, 'button', 'id', 'delete-btn');
        $deleteBtn.classList.add('none');

        // Add project items style
        $projectItemContainer.addEventListener('mouseover', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
            event.currentTarget.querySelector('.project-length').classList.toggle('none');
            event.currentTarget.querySelector('#delete-btn').classList.toggle('none');
        });
        $projectItemContainer.addEventListener('mouseout', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
            event.currentTarget.querySelector('.project-length').classList.toggle('none');
            event.currentTarget.querySelector('#delete-btn').classList.toggle('none');
        });

        // $projectLength.addEventListener('mouseover', (event) => {
        //     event.currentTarget.querySelector('.project-length').classList.toggle('red');
        //     event.currentTarget.querySelector('#delete-btn').classList.toggle('none');
        // });
        // $projectLength.addEventListener('mouseout', (event) => {
        //     event.currentTarget.querySelector('.project-length').classList.toggle('none');
        //     event.currentTarget.querySelector('#delete-btn').classList.toggle('none');
        // });

        // Add project items event listener
        $projectItemContainer.addEventListener('click', (e) => displayProject(e));

        const displayProject = (e) => {
            const projectName = e.target.closest('div').querySelector('.project-name').textContent;
            const project = projectInstances
                .getInstances()
                .find((project) => project.getName() === projectName);
            const $main = document.querySelector('main');
            const $itemList = document.querySelector('#item-list');
            if ($itemList) {
                $itemList.remove();
            }
            $main.appendChild(displayItemList(project));
        };

        // Add delete btn event listener
        $deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const name = e.currentTarget.parentElement.querySelector('.project-name').textContent;
            const project = projectInstances
                .getInstances()
                .find((project) => project.getName() === name);

            projectInstances.removeInstance(project);

            const container = e.currentTarget.closest('.project-container');
            if (container) {
                container.remove();
            }

            const $itemList = document.querySelector('#item-list');
            if ($itemList) {
                $itemList.remove();
            }

            const $main = document.querySelector('main');
            const project0 = projectInstances.getInstances()[0];

            if (projectInstances.getLength() > 0) {
                $main.appendChild(displayItemList(project0));
            }
        });
    });
    // const defaultProject = projectInstances
    //     .getInstances()
    //     .find((project) => project.getName() === 'default');
    // document.querySelector('main').appendChild(displayItemList(defaultProject));
    // console.log(projectInstances.getInstances());

    return $sidebar;
};
