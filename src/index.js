import { Project } from './JS-files/ProjectClass';
import { ToDoItem } from './JS-files/ToDoItemClass';
import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';

const defaultProject = new Project();
const testProject = new Project('test');
const test1Project = new Project('test1');

const toDoTest = new ToDoItem(
    'Gestionnaire mdp',
    "Trouver le meilleur gestionnaire mdp et l'installer",
    null,
    'P1',
    'no comments'
);
const toDoTest1 = new ToDoItem(
    'Gestionnaire mdp 123456',
    "Trouver le meilleur gestionnaire mdp et l'installer",
    null,
    'P1',
    'no comments'
);

defaultProject.addNewItem(toDoTest);
defaultProject.addNewItem(toDoTest1);
defaultProject.addNewItem(toDoTest);
defaultProject.addNewItem(toDoTest);
defaultProject.addNewItem(toDoTest);
defaultProject.addNewItem(toDoTest);
testProject.addNewItem(toDoTest);
test1Project.addNewItem(toDoTest);

loadMainPage();

// import { dom } from './global';
// import { generateCalendar } from './calendar';

// const div = dom.createDiv(document.body);

// div.innerHTML = generateCalendar();
