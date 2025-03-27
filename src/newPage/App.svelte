<script>
	import inicialHtml from '../assets/test_in.txt?raw';
	import turmaHtml from '../assets/test_turma.txt?raw';
	import { parseInicial, parseTurma } from './lib/scraper';
	import { toTitleCase } from './lib/utils';

	const dataPromise = (async () => {
		const res1 = parseTurma(Document.parseHTMLUnsafe(turmaHtml));
		console.log(res1);
		const res2 = parseInicial(Document.parseHTMLUnsafe(inicialHtml));
		console.log(res2);
		return {
			...res1,
			...res2,
		};
	})();
</script>

<main class="flex min-h-full flex-col">
	<nav class="flex min-h-8 w-full items-center bg-gray-100 p-2">
		<span>Sigaa</span>
	</nav>
	<div class="flex flex-1 items-stretch">
		{#await dataPromise}
			<p>Carregando..</p>
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
						<div class="flex gap-5">
							{#each data.ultimasNoticias as noticia}
								<div
									class="flex w-72 cursor-pointer flex-col rounded-xl bg-white p-3 pb-2 shadow outline outline-gray-300 transition-all hover:-translate-y-1.5 hover:shadow-lg"
								>
									<h1 class="mb-1.5 text-xl">
										{noticia.titulo}
									</h1>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
										do eiusmod
									</p>
									<span class="self-end text-sm text-gray-400 italic"
										>{noticia.horario}</span
									>
								</div>
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
