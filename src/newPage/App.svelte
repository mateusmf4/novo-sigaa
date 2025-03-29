<script lang="ts">
	import { RouterView, RouterContext, links } from '@dvcol/svelte-simple-router';
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
		routes,
	} as const;
</script>

<RouterContext {options}>
	<main class="flex min-h-screen flex-col" use:links>
		<nav class="flex min-h-8 w-full items-center bg-gray-100 p-2">
			<a href="/">Sigaa</a>
		</nav>
		<div class="flex-1">
			<RouterView />
		</div>
	</main>
</RouterContext>
