<script lang="ts">
	import Config from './config.svelte';
	import Preview from './preview.svelte';

	let { data } = $props();

	$inspect(data);
</script>

<div class="w-full p-4 flex flex-col gap-4 items-start">
	<h1 class="text-xl">Sources de données</h1>
	<Config />
	<Preview data={data.data} schema={data.schema} />
</div>
