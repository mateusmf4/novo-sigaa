<script>
	import { onMount } from 'svelte';

	let countSync = 0;

	onMount(() => {
		(async () => {
			console.log('hii');
			// let data = await (await fetch('https://pre.ufcg.edu.br:8443/ControleAcademicoOnline/Controlador?command=AlunoHistorico')).text();
			// console.log("data is", data);
		})();
	});
</script>

<main>
	<h3>Options Page</h3>
</main>

<style>
	:global(:root) {
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			'Open Sans',
			'Helvetica Neue',
			sans-serif;

		color-scheme: light dark;
		background-color: #242424;
	}

	@media (prefers-color-scheme: light) {
		:global(:root) {
			background-color: #fafafa;
		}

		a:hover {
			color: #ff3e00;
		}
	}

	:global(body) {
		min-width: 20rem;
		margin: 0;
	}

	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h3 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 1.5rem;
		font-weight: 200;
		line-height: 1.2rem;
		margin: 2rem auto;
	}

	a {
		font-size: 0.5rem;
		margin: 0.5rem;
		color: #cccccc;
		text-decoration: none;
	}
</style>
