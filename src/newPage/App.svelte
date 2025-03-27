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
		<p class="text-amber-700">{data.turmas}</p>
		<p>{data.nome}</p>
		<p>{data.codigo}</p>
		<p>{data.professor}</p>
	{/await}
</main>
