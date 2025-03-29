<script>
	import { links, link } from '@dvcol/svelte-simple-router';
	import { parseInicial } from '../lib/scraper';
	import { SigaaRequests } from '../lib/requests';

	const dataPromise = (async () => {
		const res1 = parseInicial(Document.parseHTMLUnsafe(await SigaaRequests.requestInicial()));
		console.log(res1);
		return res1;
	})();
</script>

<main class="flex min-h-full flex-col" use:links>
	<nav class="flex min-h-8 w-full items-center bg-gray-100 p-2">
		<a href="/">Sigaa</a>
	</nav>
	<div class="flex-1">
		{#await dataPromise}
			<p>Carregando..</p>
		{:then data}
			<div class="flex flex-col">
				{#each data.turmas as turma}
					<a
						href="/turma/:id"
						class="text-blue-700 underline"
						use:link={{ params: { id: turma.formData.frontEndIdTurma } }}
						>{turma.nome}</a
					>
				{/each}
			</div>
		{:catch e}
			{console.error(e)}
			<p>vish deu erro</p>
		{/await}
	</div>
</main>
