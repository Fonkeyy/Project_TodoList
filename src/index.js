// import { Project } from './JS-files/ProjectClass';
// import { TodoItem } from './JS-files/ToDoClass';
import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';
import { storageService } from './JS-files/storageService';
import { projectInstances } from './JS-files/ProjectClass';

document.title = 'todo app';
const html = document.querySelector('html');
html.setAttribute('lang', 'en');

const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'A simple todo app';

const head = document.head || document.getElementsByTagName('head')[0];
head.appendChild(metaDescription);

// new Project('default');
// new Project('Archive');
// new Project('test');
// new Project('test1');

// new TodoItem('try mdp 123456', 'find something', '2023-17-08', '1', 'test', 'no comments');
// new TodoItem('try mdp', 'find something', '2023-07-04', '2', 'default', 'no comments');
// new TodoItem('trydsfbfbdw mdp', 'find sdbdfb', '2023-07-04', '1', 'default', 'no comments');
// new TodoItem('try msdfbwdfbbwdffdp', 'ffdwbind something', '2023-07-04', '3', 'default', 'no comments');

if (storageService.get('instances')) {
    projectInstances.instances = JSON.parse(storageService.get('instances'));
}
console.log(projectInstances.instances);
loadMainPage();
