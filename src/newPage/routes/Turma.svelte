<script lang="ts">
	import { useRoute } from '@dvcol/svelte-simple-router';
	import type { Frequencia, PaginaTurma } from '@/lib/sigaa/types';
	import { toTitleCase } from '@/lib/utils';
	import Sigaa from '@/lib/sigaa';

	import TurmaNoticiaCard from '@/components/TurmaNoticiaCard.svelte';
	import ProgressBar from '@/components/ProgressBar.svelte';

	const { view: View, ...viewProps } = $props();
	const id = $derived(useRoute()!.location!.params.id as string);

	const dataPromise = $derived(
		(async (id: string) => {
			const turma = await Sigaa.getTurma(id);
			console.log(turma);
			return turma;
		})(id)
	);
</script>

<svelte:head>
	{#await dataPromise then turma}
		<title>Turma - {turma.nome}</title>
	{/await}
</svelte:head>

<div class="flex flex-1 items-stretch">
	{#await dataPromise}
		<div class="flex flex-1 flex-col items-center justify-center">
			<p class="italic opacity-50">Carregando...</p>
		</div>
	{:then turma}
		<nav class="border-sg-outline flex w-2xs flex-col gap-4 border-r p-4">
			<div class="flex items-stretch gap-3">
				<img
					src="https://api.dicebear.com/9.x/shapes/svg?seed={id}"
					alt="abstract logo"
					class="h-12 rounded-full"
				/>
				<div class="flex flex-col justify-between">
					<p class="line-clamp-1 text-xl/5 break-all text-ellipsis">
						{toTitleCase(turma.nome)}
					</p>
					<p class="text-sm/4">{toTitleCase(turma.professor)}</p>
				</div>
			</div>
			<ul class="flex list-inside list-disc flex-col gap-3 p-2">
				<li><a href="/turma/{id}/">Pagina inicial</a></li>
				<li><a href="/turma/{id}/frequencia">Frequencia</a></li>
				<li><a href="/turma/{id}/notas">Notas</a></li>
			</ul>
		</nav>

		<View {turma} {...viewProps} />
	{/await}
</div>
