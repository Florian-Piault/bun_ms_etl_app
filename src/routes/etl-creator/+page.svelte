<script lang="ts">
	import { goto } from '$app/navigation';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();

	const etlConfig = $state({
		uri: '',
		path: ''
	});

	const dataKeys = $derived(Object.keys(data.data || {}));

	const onSubmit = async (e: Event) => {
		e.preventDefault();

		const url = new URL('http://localhost:5173/etl-creator');

		if (etlConfig.uri) url.searchParams.set('uri', etlConfig.uri);
		if (etlConfig.path) url.searchParams.set('path', etlConfig.path);

		await goto(url.toString());
	};

	$inspect(data.schema);
	$inspect(data.data);
</script>

<h1>ETL Creator</h1>

<div class="w-full p-4">
	<form class="flex flex-row gap-2" onsubmit={onSubmit}>
		<input
			class="border rounded"
			bind:value={etlConfig.uri}
			placeholder="uri"
			type="text"
			name="uri"
		/>
		<input
			class="border rounded"
			placeholder="Chemin vers la donnée"
			bind:value={etlConfig.path}
			name="path"
			type="text"
		/>
		<button
			type="submit"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Analyser</button
		>
	</form>

	<Table.Root class="w-11/12 p-4">
		<Table.Caption>Données</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>Nom</Table.Head>
				<Table.Head>Valeur</Table.Head>
				<Table.Head>Type</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each dataKeys as key, i (i)}
				<Table.Row>
					<Table.Cell>{key}</Table.Cell>
					<Table.Cell class="max-w-xs overflow-hidden overflow-ellipsis whitespace-nowrap"
						>{data.data[key]}</Table.Cell
					>
					<Table.Cell
						>{JSON.stringify(
							data.schema?.definitions.find((d) => d.key === key)?.type.name
						)}</Table.Cell
					>
				</Table.Row>
			{:else}
				<Table.Row>No data</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
