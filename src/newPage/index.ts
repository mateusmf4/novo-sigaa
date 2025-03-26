import { mount } from 'svelte';
import App from './App.svelte';

document.styleSheets[0].disabled = true;
document.styleSheets[1].disabled = true;
document.body.innerHTML = '';

mount(App, { target: document.body });
