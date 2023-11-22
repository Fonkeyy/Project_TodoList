import { loadMainPage } from './JS-files/homePage';
import { createArchiveProject, loadLocalStorage } from './JS-files/global';
import './CSS-files/global.css';

document.title = 'todo app';
const html = document.querySelector('html');
html.setAttribute('lang', 'en');

const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'A simple todo app';

const head = document.head || document.getElementsByTagName('head')[0];
head.appendChild(metaDescription);

createArchiveProject();
loadLocalStorage();
loadMainPage();
