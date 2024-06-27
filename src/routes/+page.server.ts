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
	const pipelineRes = await fetch('http://localhost:3000/etl/data?pipelineId=swapi');
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
	const schema = await fetch(uri, {
		method: 'POST',
		body: JSON.stringify(pipelineData)
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
			return null;
		});

	if (!schema) {
		return {
			path,
			schema: {
				table: '',
				definitions: [],
				path
			},
			info: schema
		};
	}

	return {
		path,
		schema: schema as Schema,
		info: null
	};
}
