import { mount } from 'svelte';
import './style.css';
import App from './App.svelte';

// document.styleSheets[0].disabled = true;
// document.styleSheets[1].disabled = true;
document.body.innerHTML = '<div id="app"></div>';

mount(App, { target: document.getElementById('app')! });
