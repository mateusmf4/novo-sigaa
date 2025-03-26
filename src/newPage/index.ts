import { mount } from 'svelte';
import App from './App.svelte';

console.log('Executando..');
// document.styleSheets[0].disabled = true;
// document.styleSheets[1].disabled = true;
document.body.innerHTML = '<div id="app"></div>';

mount(App, { target: document.getElementById('app')! });
