<script>
	import Sigaa from '../lib/sigaa';
	import { userState } from '../lib/state.svelte';

	const dataPromise = (async () => {
		const data = await Sigaa.getInicial();
		console.log(data);
		userState.set(data.userProfile);

		return data;
	})();
</script>

<svelte:head>
	<title>Pagina Inicial</title>
</svelte:head>

{#await dataPromise}
	<p>Carregando..</p>
{:then data}
	<div class="flex flex-col">
		{#each data.turmas as turma}
			<a href={`/turma/${turma.formData.frontEndIdTurma}`} class="text-blue-700 underline">
				{turma.nome}
			</a>
		{/each}
	</div>
{:catch e}
	{console.error(e)}
	<p>vish deu erro</p>
{/await}
