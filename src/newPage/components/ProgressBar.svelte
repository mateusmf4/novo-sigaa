<script lang="ts">
	let { value, text = undefined }: { value: number; text?: string } = $props();

	let clampedValue = $derived(Math.min(Math.max(value, 0), 1));
</script>

<div
	class="outline-sg-outline relative isolate flex h-5 w-32 items-center justify-center overflow-clip rounded-xl shadow outline"
>
	<div class="absolute left-0 -z-1 h-full bg-blue-500" style:width="{clampedValue * 100}%"></div>
	<p>{text ?? `${Math.round(value * 100)}%`}</p>
</div>
