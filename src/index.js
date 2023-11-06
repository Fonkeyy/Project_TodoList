import { loadMainPage } from './JS-files/homePage';
import './CSS-files/global.css';
import { loadLocalStorage } from './JS-files/global';

document.title = 'todo app';
const html = document.querySelector('html');
html.setAttribute('lang', 'en');

const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = 'A simple todo app';

const head = document.head || document.getElementsByTagName('head')[0];
head.appendChild(metaDescription);

loadLocalStorage();
loadMainPage();
