import axios, {
	AxiosError,
	type AxiosAdapter,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
} from 'axios';

function headersToObject(headers: Headers | undefined | null): Record<string, string> {
	const out: Record<string, string> = {};
	if (!headers || typeof headers.forEach !== 'function') return out;
	headers.forEach((value, key) => {
		out[key] = value;
	});
	return out;
}

/**
 * Axios adapter over `fetch` so the same client works in Node/SSR and tests that stub fetch.
 */
export const fetchAxiosAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
	const url = axios.getUri(config);
	const method = (config.method ?? 'get').toUpperCase();
	const headers: Record<string, string> = {};
	const headerBag = config.headers;
	if (headerBag && typeof headerBag.forEach === 'function') {
		headerBag.forEach((value: unknown, key: string) => {
			if (value === undefined || value === false) return;
			headers[key] = String(value);
		});
	}
	const body =
		method === 'GET' || method === 'HEAD'
			? undefined
			: typeof config.data === 'string' || config.data instanceof FormData
				? config.data
				: config.data != null
					? JSON.stringify(config.data)
					: undefined;
	const response = await fetch(url, {
		method,
		headers,
		body,
		credentials: config.withCredentials ? 'include' : 'same-origin',
		cache: 'no-store',
	});
	const text = await response.text();
	let data: unknown = text;
	if (text.trim()) {
		try {
			data = JSON.parse(text);
		} catch {
			data = text;
		}
	} else {
		data = '';
	}
	const axiosResponse: AxiosResponse = {
		data,
		status: response.status,
		statusText: response.statusText,
		headers: headersToObject(response.headers),
		config,
		request: undefined,
	};
	const valid = config.validateStatus?.(response.status) ?? (response.status >= 200 && response.status < 300);
	if (!valid) {
		throw new AxiosError(
			`Request failed with status code ${response.status}`,
			String(response.status),
			config,
			undefined,
			axiosResponse,
		);
	}
	return axiosResponse;
};
