const apiUrl = 'http://localhost:3000';

export const httpGet = async <T>(endpoint: string): Promise<T | null> => {
	const response = await fetch(`${apiUrl}/${endpoint}`)
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
			return null;
		});

	return response as T | null;
};

export const httpPost = async <T>(endpoint: string, body: unknown): Promise<T | null> => {
	const response = await fetch(`${apiUrl}/${endpoint}`, {
		method: 'POST',
		body: JSON.stringify(body)
	})
		.then((res) => res.json())
		.catch((err) => {
			console.error(err);
			return null;
		});

	return response as T | null;
};
