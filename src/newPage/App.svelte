<script lang="ts">
	import { RouterView } from '@dvcol/svelte-simple-router';
	import type { Route, RouterOptions } from '@dvcol/svelte-simple-router';

	import Main from './routes/Home.svelte';
	import Turma from './routes/Turma.svelte';

	const RouteName = {
		Turma: 'turma',
		Home: 'home',
	} as const;

	type RouteNames = (typeof RouteName)[keyof typeof RouteName];

	export const routes: Readonly<Route<RouteNames>[]> = [
		{
			name: RouteName.Home,
			path: '/',
			component: Main,
		},
		{
			name: RouteName.Turma,
			path: `/${RouteName.Turma}/:id`,
			component: Turma,
		},
	] as const;

	export const options: RouterOptions<RouteNames> = {
		base: 'novoSigaa',
		nameAsTitle: true,
		routes,
	} as const;
</script>

<RouterView {options} />
