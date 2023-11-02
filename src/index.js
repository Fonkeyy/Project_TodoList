import { Project } from './JS-files/ProjectClass';
import { ToDoItem } from './JS-files/ToDoClass';
import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';

document.title = 'todo app';
const html = document.querySelector('html');
html.setAttribute('lang', 'en');

const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'A simple todo app';

const head = document.head || document.getElementsByTagName('head')[0];
head.appendChild(metaDescription);

new Project('default');
new Project('Archive');
new Project('test');
new Project('test1');

new ToDoItem('try mdp 123456', 'find something', '2023-17-08', '1', 'test', 'no comments');
new ToDoItem('try mdp', 'find something', '2023-07-04', '2', 'default', 'no comments');
new ToDoItem('trydsfbfbdw mdp', 'find sdbdfb', '2023-07-04', '1', 'default', 'no comments');
new ToDoItem('try msdfbwdfbbwdffdp', 'ffdwbind something', '2023-07-04', '3', 'default', 'no comments');

loadMainPage();
