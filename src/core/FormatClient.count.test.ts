import axios from 'axios';

import { ApiClientError } from '../envelope';
import { fetchAxiosAdapter } from '../fetchAdapter';
import { createFormatClient } from './FormatClient';

describe('FormatClient.count', () => {
	const originalFetch = globalThis.fetch;

	afterEach(() => {
		globalThis.fetch = originalFetch;
	});

	it('POSTs /count without page query and returns data.count', async () => {
		const seen: { url?: string; body?: string } = {};
		globalThis.fetch = (async (url: RequestInfo | URL, init?: RequestInit) => {
			seen.url = String(url);
			seen.body = typeof init?.body === 'string' ? init.body : undefined;
			return new Response(JSON.stringify({ status: 'success', data: { count: 12 } }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}) as typeof fetch;

		const http = axios.create({
			baseURL: 'http://tenant.example',
			adapter: fetchAxiosAdapter,
		});
		const api = createFormatClient({ http });
		const count = await api.count(
			{ path: '/api/v1.0/orm-data/Book' },
			{ where: [{ column: 'status', value: 'open' }] },
		);

		expect(count).toBe(12);
		expect(seen.url).toBe('http://tenant.example/api/v1.0/orm-data/Book/count');
		expect(seen.url).not.toContain('page=');
		expect(seen.body).toBe(JSON.stringify({ where: [{ column: 'status', value: 'open' }] }));
	});

	it('throws when data.count is missing', async () => {
		globalThis.fetch = (async () =>
			new Response(JSON.stringify({ status: 'success', data: {} }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			})) as typeof fetch;

		const http = axios.create({
			baseURL: 'http://tenant.example',
			adapter: fetchAxiosAdapter,
		});
		const api = createFormatClient({ http });
		await expect(api.count({ path: '/api/v1.0/orm-data/Book' })).rejects.toBeInstanceOf(ApiClientError);
	});
});
