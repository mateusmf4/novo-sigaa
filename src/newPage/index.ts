import { mount } from 'svelte';
import './style.css';
import App from './App.svelte';

console.log('executando index.ts');
document.body.innerHTML = '<div id="app"></div>';

mount(App, { target: document.getElementById('app')! });
