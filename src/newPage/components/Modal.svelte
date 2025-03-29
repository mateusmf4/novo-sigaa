<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		showModal = $bindable(),
		children,
		class: extraClasses = '',
	}: {
		showModal: Boolean;
		children?: Snippet;
		class?: string;
	} = $props();

	let dialog = $state() as HTMLDialogElement;

	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialog) dialog.close();
	}}
	class="overflow-visible bg-transparent focus:outline-none {extraClasses}"
>
	{@render children?.()}
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
