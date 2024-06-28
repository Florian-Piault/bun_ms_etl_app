import { httpPost } from '$lib/api';
import type { Schema } from '$lib/schema.models';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const paramUri = url.searchParams.get('uri');
	const paramType = url.searchParams.get('type');

	if (!paramUri) {
		return {
			data: null,
			schema: null
		};
	}

	const uriRegexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	if (!uriRegexp.test(paramUri)) {
		return {
			data: null,
			schema: null
		};
	}

	const response = await httpPost<{ data: Record<string, unknown>; schema: Schema }>('datasource', {
		uri: paramUri,
		type: paramType
	});
	const { data, schema } = response || { data: null, schema: null };

	return {
		data,
		schema
	};
};
