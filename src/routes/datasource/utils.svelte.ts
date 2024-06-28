import type { Schema } from '$lib/schema.models';

export const isDataArray = (key: string, record: Record<string, unknown>) => {
	const row = record[key];
	return Array.isArray(row);
};

export const isDataObject = (key: string, record: Record<string, unknown>) => {
	const row = record[key];
	return typeof row === 'object';
};

export const getDefinitionsFromPath = (schema: Schema | null, path: string) => {
	if (!schema) return [];

	const keys = path.split('.');
	let definitions = schema.definitions;

	for (const key of keys) {
		const subDefinition = definitions.find((x) => x.key === key)?.type.precision;

		if (!subDefinition || !(subDefinition instanceof Array)) return [];
		else definitions = subDefinition;
	}

	return definitions;
};

export function getPropertyByPath(obj: any, path: string | undefined): Record<string, unknown>[] {
	if (!obj) return [];

	if (!path || path === '') {
		return obj;
	}

	try {
		const property = path.split('.').reduce((r, a) => r && r[a], obj);

		console.log($state.snapshot(property));

		return property;
	} catch (e) {
		console.error(e);
		return obj;
	}
}
