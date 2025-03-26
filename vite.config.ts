import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve as pathResolve } from 'node:path';
import sveltePreprocess from 'svelte-preprocess';
import manifest from './src/manifest';

export default defineConfig(({ mode }) => {
	const production = mode === 'production';

	return {
		build: {
			emptyOutDir: true,
			outDir: 'build',
			rollupOptions: {
				output: {
					chunkFileNames: 'assets/chunk-[hash].js'
				}
			}
		},
		plugins: [
			crx({ manifest }),
			svelte({
				compilerOptions: {
					dev: !production
				},
				preprocess: sveltePreprocess()
			})
		],
		resolve: {
			alias: {
				'@': pathResolve(__dirname, 'src')
			}
		},
		legacy: {
			skipWebSocketTokenCheck: true
		},
		server: {
			cors: true
		}
	};
});
