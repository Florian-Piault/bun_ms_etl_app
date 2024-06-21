<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Schema } from '$lib/schema.models.js';

	const { data } = $props();
	let path = $state<string | undefined>('');

	$effect(() => {
		if (data.path) {
			path = data.path;
		}
	});

	const searchDeep = (e: Event) => {
		e.preventDefault();
		if (path === '' || !path) goto('/');
		else goto(`/?path=${path}`);
	};
</script>

<div class="p-4">
	<form onsubmit={(e) => searchDeep(e)} class="flex flex-row gap-2 items-end">
		<label class="flex-1">
			<small class="pl-4 text-xs text-slate-500">Chemin vers les propriétés</small>
			<input
				class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				type="text"
				bind:value={path}
			/>
		</label>
		<button
			type="submit"
			class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
		>
			Analyser
		</button>
	</form>
</div>

<article class="border-slate-300 border p-2 rounded md:w-1/2 w-9/12 mx-auto relative">
	<small class="pl-4 text-xs text-slate-500">Schéma</small>
	<hr />
	{@render schema(data.schema)}
</article>

{#snippet schema(x: Schema)}
	<div class="pl-4">
		{#each x as definition}
			{#if definition.key !== ''}
				<div class="flex flex-row gap-2 items-center justify-start">
					<h4 class="font-semibold text-slate-500">{definition.key}</h4>
					<small>{definition.type.name}</small>
				</div>
			{/if}

			{#if Array.isArray(definition.type.subType)}
				{@render schema(definition.type.subType)}
			{/if}
		{/each}
	</div>
{/snippet}
