import { Project, projectInstances } from './JS-files/ProjectClass';
import { ToDoItem } from './JS-files/ToDoClass';
import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';

// const defaultProject =
new Project('default');
// const testProject =
new Project('test');
// const test1Project =
new Project('test1');

// const toDoTest =
new ToDoItem('try mdp 123456', 'find something', '17/08/2023', 'P1', 'test', 'no comments');
new ToDoItem('try mdp', 'find something', '07/04/2023', 'P2', 'default', 'no comments');
// const toDoTest1 =

// defaultProject.addNewItem(toDoTest1);
// testProject.addNewItem(toDoTest1);
// testProject.addNewItem(toDoTest);
// testProject.addNewItem(toDoTest1);
// testProject.addNewItem(toDoTest);
// testProject.addNewItem(toDoTest1);
// testProject.addNewItem(toDoTest);
// test1Project.addNewItem(toDoTest);
// test1Project.addNewItem(toDoTest);
// test1Project.addNewItem(toDoTest);

loadMainPage();
console.log(projectInstances.getInstances());
