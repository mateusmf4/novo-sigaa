import { defineManifest } from '@crxjs/vite-plugin';
import packageData from '../package.json';

export default defineManifest({
	name: packageData.name,
	description: packageData.description,
	version: packageData.version,
	manifest_version: 3,
	icons: {
		16: 'img/logo-16.png',
		32: 'img/logo-32.png',
		48: 'img/logo-48.png',
		128: 'img/logo-128.png',
	},
	content_scripts: [
		{
			matches: ['*://sigaa.ufcg.edu.br/novoSigaa'],
			js: ['src/newPage/index.ts'],
		},
	],
	web_accessible_resources: [
		{
			resources: [
				'img/logo-16.png',
				'img/logo-32.png',
				'img/logo-48.png',
				'img/logo-128.png',
			],
			matches: [],
		},
	],
	permissions: ['storage'],
	host_permissions: ['<all_urls>'],
});
