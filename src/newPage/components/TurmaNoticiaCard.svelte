<script lang="ts">
	import { type PaginaTurmaNoticia } from '../lib/sigaa/types';
	import Sigaa from '../lib/sigaa';
	import Modal from './Modal.svelte';

	const { noticia }: { noticia: PaginaTurmaNoticia } = $props();

	let showModal = $state(false);
	let promise = $derived(fetchData(noticia));

	async function fetchData(noticia: PaginaTurmaNoticia) {
		return await Sigaa.getTurmaNoticia(noticia);
	}
</script>

<button
	class="hocus:-translate-y-1.5 hocus:shadow-lg flex max-h-40 w-72 cursor-pointer appearance-none flex-col rounded-xl bg-white p-3 pb-2 text-left shadow outline outline-gray-300 transition-all select-none focus:outline-gray-500"
	onclick={() => {
		showModal = true;
	}}
>
	<h1 class="mb-1.5 line-clamp-1 text-xl text-ellipsis">
		{noticia.titulo}
	</h1>
	{#await promise}
		<p class="italic opacity-50">Carregando..</p>
	{:then data}
		<p class="opacity-gradient-mask-bottom line-clamp-3 overflow-hidden text-ellipsis">
			{data.conteudo}
		</p>
	{/await}
	<div class="flex-1"></div>
	<span class="self-end text-sm text-gray-400 italic">{noticia.horario}</span>
</button>

<Modal bind:showModal class="min-h-32 min-w-72 overflow-visible bg-transparent lg:max-w-3/5">
	<div
		class="flex flex-col items-center rounded-xl bg-white p-3 shadow outline outline-gray-300 sm:mx-4"
	>
		<h1 class="mb-1.5 text-xl">
			{noticia.titulo}
		</h1>
		{#await promise}
			<p class="italic opacity-50">Carregando..</p>
		{:then data}
			<div class="w-full">
				{#each data.conteudo.split('\n') as line}
					<p class="text-pretty break-words">{line}</p>
				{/each}
			</div>
		{/await}
		<div class="flex-1"></div>
		<span class="self-end text-sm text-gray-400 italic">{noticia.horario}</span>
		<form method="dialog">
			<button
				class="cursor-pointer rounded px-4 py-1 shadow outline outline-gray-300 transition-all hover:bg-gray-50 hover:shadow-lg focus:outline-gray-500"
				>OK</button
			>
		</form>
	</div>
</Modal>

<style>
	.opacity-gradient-mask-bottom {
		mask-image: linear-gradient(180deg, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%);
		mask-size: 100% 100%;
		mask-repeat: no-repeat;
		mask-position: left top;
	}
</style>
