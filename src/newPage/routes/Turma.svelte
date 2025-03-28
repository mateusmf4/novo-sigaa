<script lang="ts">
	import { links, useRoute } from '@dvcol/svelte-simple-router';
	import { parseNoticia, parseTurma, type PaginaTurmaNoticia } from '../lib/scraper';
	import { toTitleCase } from '../lib/utils';
	import { SigaaRequests } from '../lib/requests';
	import TurmaNoticiaCard from '../components/TurmaNoticiaCard.svelte';

	const id = $derived(useRoute()!.location!.params.id as string);
	const dataPromise = $derived(
		(async (id: string) => {
			const html = await SigaaRequests.requestTurma(id);
			const res1 = parseTurma(Document.parseHTMLUnsafe(html));
			console.log(res1);
			return res1;
		})(id)
	);

	async function fetchNoticia(id: PaginaTurmaNoticia) {
		return parseNoticia(Document.parseHTMLUnsafe(await SigaaRequests.requestNoticia(id)));
	}
</script>

<main class="flex min-h-full flex-col" use:links>
	<nav class="flex min-h-8 w-full items-center bg-gray-100 p-2">
		<a href="/">Sigaa</a>
	</nav>
	<div class="flex flex-1 items-stretch">
		{#await dataPromise}
			<div class="flex flex-1 flex-col items-center justify-center">
				<p class="italic opacity-50">Carregando...</p>
			</div>
		{:then data}
			<nav class="flex min-w-2xs flex-col bg-gray-50">hi</nav>
			<div class="flex flex-1 flex-col">
				<header class="border-b border-gray-300 p-4">
					<div class="flex items-center gap-4">
						<div class="aspect-square h-full w-16 rounded-full bg-red-100"></div>
						<div class="flex flex-col">
							<p>{toTitleCase(data.nome)}</p>
							<p>{data.codigo}</p>
							<p>{toTitleCase(data.professor)}</p>
						</div>
					</div>
				</header>
				<div class="flex flex-1 flex-col gap-6 p-6">
					<section class="flex flex-col">
						<h2>Ultimas noticias</h2>
						<div class="flex gap-6">
							{#each data.ultimasNoticias as noticia}
								<TurmaNoticiaCard {noticia} />
							{/each}
						</div>
					</section>
					<span class="w-full border-b border-gray-300"></span>
					{#each data.aulas as aula}
						<div
							class="flex flex-col rounded-xl bg-white p-3 shadow outline outline-gray-300"
						>
							<h1 class="mb-2 border-b border-gray-200 text-xl">
								{aula.titulo} ({aula.inicio} - {aula.fim})
							</h1>
							<p>
								{aula.descricao}
							</p>
						</div>
					{/each}
				</div>
			</div>
		{/await}
	</div>
</main>
