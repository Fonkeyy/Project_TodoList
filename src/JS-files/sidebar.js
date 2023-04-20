import { dom } from './global';
import { projectInstances } from './ProjectClass';
import { displayItemList } from './homePage';
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

        // Add project items style
        $projectItemContainer.addEventListener('mouseover', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
        });
        $projectItemContainer.addEventListener('mouseout', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
        });

        // Add project items event listener
        $projectItemContainer.addEventListener('click', (e) => {
            const projectName = e.target.closest('div').querySelector('p').textContent;
            const project = projectInstances
                .getInstances()
                .find((project) => project.getName() === projectName);
            const $main = document.querySelector('main');
            const $itemList = document.querySelector('#item-list');
            $itemList.remove();
            $main.appendChild(displayItemList(project));
        });
    });
    return $sidebar;
};

// const resizeSidebar = () => {

// }

// const $toggleBtn = dom.createBtn($sidebar, 'button', 'id', 'toggle-btn');
// $sidebar.appendChild($toggleBtn);

// $toggleBtn.addEventListener('click', () => {

// })
