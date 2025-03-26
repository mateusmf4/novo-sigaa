import { mount } from 'svelte';
import App from './App.svelte';

let styleNode = document.querySelector('style')!;
styleNode.disabled = true;
document.body.innerHTML = '';

mount(App, { target: document.body });
