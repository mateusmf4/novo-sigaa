<script>
	import { links } from '@dvcol/svelte-simple-router';
	import Sigaa from '../lib/sigaa';

	const dataPromise = (async () => {
		const data = await Sigaa.getInicial();
		console.log(data);
		return data;
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
						href={`/turma/${turma.formData.frontEndIdTurma}`}
						class="text-blue-700 underline"
					>
						{turma.nome}
					</a>
				{/each}
			</div>
		{:catch e}
			{console.error(e)}
			<p>vish deu erro</p>
		{/await}
	</div>
</main>
