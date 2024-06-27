import type { PageServerLoad } from './$types';
import type { Schema } from '$lib/schema.models';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const uri = url.searchParams.get('uri');
	const path = url.searchParams.get('path');

	if (!uri) {
		return {
			data: null,
			schema: null
		};
	}

	const uriRegexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	if (!uriRegexp.test(uri)) {
		return {
			data: null,
			schema: null
		};
	}

	const { data, schema } = await fetch('http://localhost:3000/etl-creator', {
		method: 'POST',
		body: JSON.stringify({ uri, path: path?.toString() })
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
			return null;
		});

	if (!data || !schema) {
		return {
			data: null,
			schema: null
		};
	}

	return {
		data,
		schema: schema as Schema
	};
};
