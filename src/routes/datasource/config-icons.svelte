<script lang="ts">
	import { Calendar, CaseUpper, Binary, Hash } from 'lucide-svelte';

	let { type }: { type: string } = $props();
</script>

{#if type === 'date'}
	<Calendar />
{:else if type === 'string'}
	<CaseUpper />
{:else if type === 'boolean'}
	<Binary />
{:else if type === 'number'}
	<Hash />
{/if}
