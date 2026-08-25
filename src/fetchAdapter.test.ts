import axios, { AxiosHeaders } from 'axios';

import { fetchAxiosAdapter, requestHeadersToObject } from './fetchAdapter';

describe('requestHeadersToObject', () => {
	it('reads AxiosHeaders via toJSON (no forEach on Axios 1.x)', () => {
		const bag = new AxiosHeaders({
			Accept: 'application/json',
			'Content-Type': 'application/json',
		});
		expect(typeof bag.forEach).toBe('undefined');
		expect(requestHeadersToObject(bag)).toEqual({
			Accept: 'application/json',
			'Content-Type': 'application/json',
		});
	});
});

describe('fetchAxiosAdapter', () => {
	const originalFetch = globalThis.fetch;

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it('forwards Content-Type on POST so JSON search bodies are accepted', async () => {
		const seen: { url?: string; contentType?: string; body?: string } = {};
		globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
			seen.url = String(url);
			const headers = new Headers(init?.headers);
			seen.contentType = headers.get('content-type') ?? undefined;
			seen.body = typeof init?.body === 'string' ? init.body : String(init?.body);
			return new Response(JSON.stringify({ status: 'success', data: [] }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}) as typeof fetch;

		const http = axios.create({
			baseURL: 'http://tenant.example',
			adapter: fetchAxiosAdapter,
			headers: { 'Content-Type': 'application/json' },
		});
		await http.post('/api/v1.0/pages/search?page=1&limit=5', {});

		expect(seen.url).toContain('/api/v1.0/pages/search');
		expect(seen.contentType).toMatch(/application\/json/i);
		expect(seen.body).toBe('{}');
	});
});
