<script lang="ts">
	import '../app.css';

	const { children } = $props();
</script>

<header class=" p-4 bg-slate-50 flex flex-row gap-2">
	<a href="/">Home</a>
	<a href="/datasource">Datasource</a>
</header>
<main>
	{@render children()}
</main>
