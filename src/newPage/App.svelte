<script lang="ts">
	import {
		RouterView,
		RouterContext,
		links,
		type RouterOptions,
	} from '@dvcol/svelte-simple-router';

	import Main from './routes/Home.svelte';
	import Turma from './routes/Turma.svelte';
	import TurmaIndex from './routes/Turma/Index.svelte';
	import TurmaFrequencia from './routes/Turma/Frequencia.svelte';
	import TurmaNotas from './routes/Turma/Notas.svelte';

	import Modal from './components/Modal.svelte';
	import { sessaoExpirada, userState } from './lib/state.svelte';
	import { toTitleCase } from './lib/utils';

	const options: RouterOptions = {
		base: 'novoSigaa',
		routes: [
			{
				path: '/',
				component: Main,
			},
			{
				path: '/turma/:id',
				component: Turma,
				props: {
					view: TurmaIndex,
				},
				children: [
					{
						path: '/frequencia',
						component: Turma,
						props: {
							view: TurmaFrequencia,
						},
					},
					{
						path: '/notas',
						component: Turma,
						props: {
							view: TurmaNotas,
						},
					},
				],
			},
		],
	};
</script>

<RouterContext {options}>
	<main class="flex min-h-screen flex-col" use:links>
		<nav
			class="border-sg-outline flex min-h-8 w-full items-center justify-between border-b p-2"
		>
			<a href="/">Sigaa</a>
			{#if $userState}
				<div class="flex items-center gap-2">
					<p>{toTitleCase($userState.nome)}</p>
					<img src={$userState.profilePicture} alt="user" class="max-h-8" />
				</div>
			{/if}
		</nav>
		<div class="flex flex-1 flex-col">
			<RouterView />
		</div>
	</main>
</RouterContext>

{#if $sessaoExpirada}
	<Modal showModal={true}>
		<div
			class="outline-sg-outline bg-sg-background flex flex-col items-center gap-2 rounded-xl p-3 shadow outline sm:mx-4"
		>
			<h1 class="text-xl">Sua sessão foi expirada</h1>
			<div class="w-full">
				<p>Faça login de novo</p>
			</div>
			<form method="dialog" class="mt-2">
				<button
					class="outline-sg-outline cursor-pointer rounded px-4 py-1 shadow outline transition-all hover:bg-gray-50 hover:shadow-lg focus:outline-gray-500"
					>OK</button
				>
			</form>
		</div>
	</Modal>
{/if}
