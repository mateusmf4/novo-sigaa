<script>
	import inicialHtml from '../assets/test_in.txt?raw';
	import turmaHtml from '../assets/test_turma.txt?raw';
	import { parseInicial, parseTurma } from '../lib/scraper';

	const dataPromise = (async () => {
		const res1 = parseTurma(Document.parseHTMLUnsafe(turmaHtml));
		console.log(res1);
		const res2 = parseInicial(Document.parseHTMLUnsafe(inicialHtml));
		console.log(res2);
		return {
			...res1,
			...res2
		};
	})();
</script>

<main>
	{#await dataPromise}
		<p>Carregando..</p>
	{:then data}
		<p>{data.turmas}</p>
		<p>{data.nome}</p>
		<p>{data.codigo}</p>
		<p>{data.professor}</p>
	{/await}
</main>

<style>
	:global(:root) {
		font-family: system-ui;
	}
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		border: 0;
	}
</style>
