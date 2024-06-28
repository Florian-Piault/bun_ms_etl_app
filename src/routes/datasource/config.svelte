<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/stores';

	let datasourceType = $state<'api' | 'db'>('api');
</script>

<div class=" border border-slate-200 p-4 rounded">
	<h2 class="pb-2">Configuration</h2>

	<Tabs.Root value={datasourceType} class="w-[400px]">
		<Tabs.List>
			<Tabs.Trigger value="api">API</Tabs.Trigger>
			<Tabs.Trigger value="db">Base de données</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="api">
			{@render API()}
		</Tabs.Content>
		<Tabs.Content value="db">
			{@render DB()}
		</Tabs.Content>
	</Tabs.Root>
</div>

{#snippet API()}
	<form class="flex flex-col gap-2">
		<Label for="uri">URL</Label>
		<Input name="uri" value={$page.url.searchParams.get('uri')} />
		<Input name="type" value="api" type="hidden" />
		<Button class="self-end mt-2" type="submit" variant="secondary">Valider</Button>
	</form>
{/snippet}

{#snippet DB()}
	<p>A implémenter</p>
{/snippet}
