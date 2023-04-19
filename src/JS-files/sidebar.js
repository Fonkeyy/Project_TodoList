import { dom } from './global';
import { projectInstances } from './ProjectClass';
export { displaySidebar };

const displaySidebar = () => {
    const $sidebar = document.createElement('div');
    $sidebar.classList.add('sidebar');

    //todo add function sidebar resize

    const $sideBarProjectContainer = dom.createDiv($sidebar, 'id', 'side-project-container');

    const $sideBarProjectContainerTitle = dom.createDiv(
        $sideBarProjectContainer,
        'id',
        'sidebar-project-container-title'
    );

    // Event listener for styles
    $sideBarProjectContainerTitle.addEventListener('mouseover', () => {
        $addProjectBtn.classList.toggle('hidden');
        $sideBarProjectContainerTitle.classList.toggle('grey-hover');
    });
    $sideBarProjectContainerTitle.addEventListener('mouseout', () => {
        $addProjectBtn.classList.toggle('hidden');
        $sideBarProjectContainerTitle.classList.toggle('grey-hover');
    });
    dom.createH($sideBarProjectContainerTitle, 'Projects', 3);
    const $addProjectBtn = dom.createBtn(
        $sideBarProjectContainerTitle,
        'button',
        'class',
        'hidden'
    );
    $addProjectBtn.addEventListener('click', () => {}); //todo => add function listeners

    projectInstances.getInstances().forEach((project) => {
        const $projectItemContainer = dom.createDiv(
            $sideBarProjectContainer,
            'class',
            'project-container'
        );
        dom.createP($projectItemContainer, `${project.getName()}`, 'class', 'project-name');
        dom.createP($projectItemContainer, `${project.getLength()}`, 'class', 'project-length');

        $projectItemContainer.addEventListener('mouseover', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
        });
        $projectItemContainer.addEventListener('mouseout', (event) => {
            event.currentTarget.classList.toggle('grey-hover');
        });
    });
    // const $projectContainers = document.querySelectorAll('.project-container');
    //     $projectContainers.forEach((container) =>
    //         container.addEventListener('click', (e) => {
    //             displayItemList(e);
    //     const project = projectInstances.getInstances().find(p => p.getName() === event.target.querySelector('.project-name').textContent);
    // displayItemList(project.getList());
    //     })
    // );
    return $sidebar;
};

// const resizeSidebar = () => {

// }

// const $toggleBtn = dom.createBtn($sidebar, 'button', 'id', 'toggle-btn');
// $sidebar.appendChild($toggleBtn);

// $toggleBtn.addEventListener('click', () => {

// })
