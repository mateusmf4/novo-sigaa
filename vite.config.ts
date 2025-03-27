import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import manifest from './src/manifest';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
	const production = mode === 'production';

	return {
		build: {
			emptyOutDir: true,
			outDir: 'build',
			// rollupOptions: {
			// 	output: {
			// 		chunkFileNames: 'assets/chunk-[hash].js'
			// 	}
			// }
		},
		plugins: [svelte(), tailwindcss(), crx({ manifest })],
		legacy: {
			skipWebSocketTokenCheck: true,
		},
		server: {
			cors: true,
		},
	};
});
