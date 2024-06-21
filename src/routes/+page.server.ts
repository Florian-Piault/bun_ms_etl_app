import type { Schema } from '$lib/schema.models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const path = url.searchParams.get('path') || '';

	const pipelineData = await getPipeline();
	if (pipelineData.info) {
		return pipelineData;
	}

	return await getSchema(pipelineData.schema, path);
};

async function getPipeline() {
	const pipelineRes = await fetch('http://localhost:3000/etl/data?pipelineId=swapi', {
		headers: { tenant: 'admin123' }
	});
	const pipelineData = await pipelineRes.json();

	if (!pipelineRes.ok) {
		return {
			schema: [],
			info: pipelineData
		};
	}

	return {
		schema: pipelineData
	};
}

async function getSchema(pipelineData: unknown, path: string) {
	const params = new URLSearchParams({ path });
	const uri = `http://localhost:3000/schema?${params.toString()}`;
	const schemaRes = await fetch(uri, {
		method: 'POST',
		headers: { tenant: 'admin123' },
		body: JSON.stringify(pipelineData)
	});
	const schema = await schemaRes.json();

	if (!schemaRes.ok) {
		return {
			path,
			schema: [] as Schema,
			info: schema
		};
	}

	return {
		path,
		schema: schema as Schema,
		info: null
	};
}
