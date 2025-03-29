<script lang="ts">
	import { RouterView, RouterContext, links } from '@dvcol/svelte-simple-router';
	import type { Route, RouterOptions } from '@dvcol/svelte-simple-router';

	import Main from './routes/Home.svelte';
	import Turma from './routes/Turma.svelte';
	import { userState } from './lib/state.svelte';
	import { toTitleCase } from './lib/utils';

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
		<nav class="flex min-h-8 w-full items-center justify-between bg-gray-100 p-2">
			<a href="/">Sigaa</a>
			{#if $userState}
				<div class="flex items-center gap-2">
					<p>{toTitleCase($userState.nome)}</p>
					<img src={$userState.profilePicture} alt="user" class="max-h-8" />
				</div>
			{/if}
		</nav>
		<div class="flex-1">
			<RouterView />
		</div>
	</main>
</RouterContext>
