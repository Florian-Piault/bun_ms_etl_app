<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import ConfigIcon from './config-icons.svelte';
	import type { Definition, Schema } from '$lib/schema.models';
	import {
		getDefinitionsFromPath,
		isDataArray,
		isDataObject,
		getPropertyByPath
	} from './utils.svelte';

	type Props = {
		data: Record<string, unknown> | null;
		schema: Schema | null;
	};

	let { data, schema }: Props = $props();

	let path = $state('');

	let drilledData = $derived(getPropertyByPath(data, path));
	const dataKeys: string[] = $derived(!drilledData ? [] : Object.keys(drilledData));
	const schemaKeys: Definition[] = $derived(!schema ? [] : getDefinitionsFromPath(schema, path));

	const drillDown = (key: string) => {
		if (path === '') path = key;
		else path = `${path}.${key}`;
	};

	const drillUp = () => {
		if (path === '') return;
		path = path.split('.').slice(0, -1).join('.');
	};
</script>

{#if !data}
	<div class="text-center">Aucune donnée à prévisualiser</div>
{:else}
	<Table.Root>
		<Table.Caption>Données de prévisualisation</Table.Caption>
		<Table.Header>
			<Table.Row>
				{#each schemaKeys as { key, type }, i (i)}
					<Table.Head>
						<span class="flex items-center gap-2">
							<ConfigIcon type={type.name} />
							{key}
						</span>
					</Table.Head>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each drilledData as drilledDatum, i (i)}
				<Table.Row>
					{#each schemaKeys as { key, type }, i (i)}
						<Table.Cell>{@render displayedDrilledData(drilledDatum, key)}</Table.Cell>
					{/each}
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<aside>
		<Button disabled={path === ''} variant="ghost" onclick={drillUp}>&lt; Retour</Button>
	</aside>
	<Table.Root class="border rounded">
		<Table.Caption>Données de prévisualisation</Table.Caption>
		<Table.Header>
			<Table.Row class="text-left bg-gray-100">
				<Table.Head>Clé</Table.Head>
				<Table.Head>Valeur</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each dataKeys as key, i (i)}
				<Table.Row>
					<Table.Cell>{key}</Table.Cell>
					<Table.Cell>{@render displayedRawValue(drilledData, key)}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/if}

{#snippet displayedRawValue(data, key)}
	{#if isDataArray(key, data)}
		<Button onclick={() => drillDown(key)} variant="link" class="text-blue-600 p-0">
			&lt;Liste de données&gt;
		</Button>
	{:else if isDataObject(key, data)}
		<Button onclick={() => drillDown(key)} variant="link" class="text-blue-600 p-0">
			&lt;Enregistrement de données&gt;
		</Button>
	{:else}
		{data[key]}
	{/if}
{/snippet}

{#snippet displayedDrilledData(data, key)}
	{#if isDataArray(key, data)}
		&lt;Liste de données&gt;
	{:else if isDataObject(key, data)}
		&lt;Enregistrement de données&gt;
	{:else}
		{data[key]}
	{/if}
{/snippet}
