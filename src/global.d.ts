/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
	import { SvelteComponentTyped } from 'svelte';
	const component: SvelteComponentTyped<any>;
	export default component;
}

declare const __APP_VERSION__: string;
