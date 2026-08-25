import axios {
	AxiosError,
	AxiosHeaders,
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
 * AxiosHeaders has toJSON, not forEach. Missing Content-Type on POST makes Page Builder 500.
 */
export function requestHeadersToObject(headerBag: unknown): Record<string, string> {
	if (!headerBag || typeof headerBag !== 'object') return {};
	const json = AxiosHeaders.from(headerBag as InternalAxiosRequestConfig['headers']).toJSON(true) as Record<
		string,
		unknown
	>;
	const headers: Record<string, string> = {};
	for (const [key, value] of Object.entries(json)) {
		if (value == null || value === false) continue;
		headers[key] = Array.isArray(value) ? value.join(', ') : String(value);
	}
	return headers;
}

/**
 * Axios adapter over `fetch` so the same client works in Node/SSR and tests that stub fetch.
 */
export const fetchAxiosAdapter: AxiosAdapter = async (config: InternalAxiosRequestConfig): Promise<AxiosResponse> => {
	const url = axios.getUri(config);
	const method = (config.method ?? 'get').toUpperCase();
	const headers = requestHeadersToObject(config.headers);
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
