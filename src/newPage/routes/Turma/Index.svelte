<script lang="ts">
	import type { Frequencia, PaginaTurma } from '@/lib/sigaa/types';
	import { toTitleCase } from '@/lib/utils';
	import Sigaa from '@/lib/sigaa';
	import { useRoute } from '@dvcol/svelte-simple-router';

	import TurmaNoticiaCard from '@/components/TurmaNoticiaCard.svelte';
	import ProgressBar from '@/components/ProgressBar.svelte';

	const { turma }: { turma: PaginaTurma } = $props();
	const id = $derived(useRoute()!.location!.params.id as string);

	async function fetchFrequencia(turma: PaginaTurma) {
		return await Sigaa.getTurmaFrequencia(turma);
	}

	function totalFaltas(freqs: Frequencia[]): number {
		return freqs.map((x) => x.faltas).reduce((a, b) => a + b, 0);
	}
</script>

<div class="flex flex-1 flex-col overflow-auto">
	<header class="border-sg-outline flex justify-between border-b p-4">
		<div class="flex items-stretch gap-4">
			<img
				src="https://api.dicebear.com/9.x/shapes/svg?seed={id}"
				alt="abstract logo"
				class="h-20 rounded-full"
			/>
			<div class="flex flex-col justify-between">
				<div class="flex flex-col">
					<p class="text-2xl/6">{toTitleCase(turma.nome)}</p>
					<p class="text-sm italic">{turma.codigo}</p>
				</div>
				<p>{toTitleCase(turma.professor)}</p>
			</div>
		</div>
		<div class="flex flex-col justify-center gap-5">
			<div class="flex items-center gap-2">
				<span class="leading-none">Faltas</span>
				{#await fetchFrequencia(turma).then(totalFaltas)}
					<ProgressBar value={0} text="..." />
				{:then faltas}
					<ProgressBar value={faltas / 14} text="{faltas} / 14" />
				{/await}
			</div>
			<div class="flex items-center gap-2">
				<span class="leading-none">Aulas</span>
				<ProgressBar value={turma.aulasMinistradas / turma.aulasTotal} />
			</div>
		</div>
	</header>
	<div class="flex flex-1 flex-col gap-6 p-6">
		<section class="flex flex-col">
			<h2 class="pb-2 text-xl">Ultimas noticias</h2>
			{#if turma.ultimasNoticias.length}
				<div class="flex gap-6">
					{#each turma.ultimasNoticias as noticia}
						<TurmaNoticiaCard {noticia} />
					{/each}
				</div>
			{:else}
				<p class="text-gray-400 italic">Nenhuma noticia registrada</p>
			{/if}
		</section>
		<span class="border-sg-outline w-full border-b"></span>
		{#each turma.aulas as aula}
			<div
				class="outline-sg-outline bg-sg-background flex flex-col rounded-xl p-3 shadow outline"
			>
				<h1 class="mb-2 border-b border-gray-200 text-xl">
					{aula.titulo} ({aula.inicio === aula.fim
						? aula.inicio
						: `${aula.inicio} - ${aula.fim}`})
				</h1>
				<p>
					{aula.descricao}
				</p>
			</div>
		{/each}
	</div>
</div>
