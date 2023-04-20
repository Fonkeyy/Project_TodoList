import { Project } from './JS-files/ProjectClass';
import { ToDoItem } from './JS-files/ToDoItemClass';
import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';

const defaultProject = new Project('default');
const testProject = new Project('test');
const test1Project = new Project('test1');

const toDoTest = new ToDoItem('try mdp', 'find something', '07/04/2023', 'P1', 'no comments');
const toDoTest1 = new ToDoItem(
    'try mdp 123456',
    'find something',
    '17/08/2023',
    'P1',
    'no comments'
);

defaultProject.addNewItem(toDoTest1);
testProject.addNewItem(toDoTest1);
testProject.addNewItem(toDoTest);
testProject.addNewItem(toDoTest1);
testProject.addNewItem(toDoTest);
testProject.addNewItem(toDoTest1);
testProject.addNewItem(toDoTest);
test1Project.addNewItem(toDoTest);
test1Project.addNewItem(toDoTest);
test1Project.addNewItem(toDoTest);

loadMainPage();
// .forEach((project) => {
//    return `${project.getName()}${project.getLength()}`;
// }

// import { dom } from './global';
// import { generateCalendar } from './calendar';

// const div = dom.createDiv(document.body);

// div.innerHTML = generateCalendar();
