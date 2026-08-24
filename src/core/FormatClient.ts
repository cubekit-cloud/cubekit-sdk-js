import axios, {
	type AxiosInstance,
	type AxiosInterceptorOptions,
	type AxiosResponse,
	isAxiosError,
} from 'axios';
import { fetchAxiosAdapter } from '../fetchAdapter';
import { ApiClientError, extractSearchItems, extractSearchTotal, parseApiEnvelope } from '../envelope';
import { normalizeJoin } from '../join';
import { parseResponse, type ItemSchema } from '../parseResponse';
import { normalizeSearchRelationships } from '../relationships';
import type {
	CrudMethod,
	FormatClientConfig,
	IndexRequestBody,
	PageParams,
	ResourceRef,
	SearchResult,
	SelectClause,
	StoreBody,
} from '../types';

const DEFAULT_API_PREFIX = '';

function joinUrl(prefix: string, ...parts: string[]): string {
	const base = prefix.replace(/\/+$/, '');
	const rest = parts
		.filter((p) => p.length > 0)
		.map((p) => p.replace(/^\/+|\/+$/g, ''))
		.join('/');
	return rest ? `${base}/${rest}` : base;
}

function sparseSearchBody(body: IndexRequestBody): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	if (body.select) out.select = body.select;
	if (body.where) out.where = body.where;
	const join = normalizeJoin(body.join);
	if (join) out.join = join;
	if (body.order) out.order = body.order;
	if (body.group_by) out.group_by = body.group_by;
	const relationships = normalizeSearchRelationships(body.relationships);
	if (relationships) out.relationships = relationships;
	if (body.return !== undefined) out.return = body.return;
	if (body.debug !== undefined) out.debug = body.debug;
	return out;
}

function writeBody(
	fields: Record<string, unknown>,
	options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
): StoreBody {
	const data: StoreBody['data'] = { fields };
	if (options?.relationships) {
		data.relationships = options.relationships;
	}
	return {
		data,
		...(options?.select ? { select: options.select } : {}),
		...(options?.relationships ? { relationships: options.relationships } : {}),
		...(options?.debug !== undefined ? { debug: options.debug } : {}),
	};
}

function wrapAxiosError(error: unknown, context: string): never {
	if (isAxiosError(error)) {
		const status = error.response?.status;
		const payload = error.response?.data;
		const row =
			payload && typeof payload === 'object' && !Array.isArray(payload)
				? (payload as Record<string, unknown>)
				: null;
		throw new ApiClientError(
			(typeof row?.message === 'string' && row.message) || error.message || `${context}: HTTP error`,
			context,
			(row?.code as string | number | undefined) ?? status,
			Array.isArray(row?.errors) ? row.errors : undefined,
			status,
		);
	}
	throw error;
}

/**
 * itaces-crud format client (search/get/create/update/delete).
 * Transport is config (`baseURL`, cookie / x-api-key, or injected axios).
 */
export class FormatClient {
	readonly http: AxiosInstance;
	#apiPrefix: string;

	constructor(config: FormatClientConfig = {}) {
		this.#apiPrefix = config.apiPrefix ?? DEFAULT_API_PREFIX;
		const baseURL = config.baseURL ?? config.baseUrl ?? '/';
		const headers: Record<string, string> = {
			'Content-Type': 'application/json',
			...config.headers,
		};
		if (config.serviceKey) {
			headers['x-api-key'] = config.serviceKey;
		}
		if (config.auth?.type === 'apiKey' && config.auth.value) {
			headers['x-api-key'] = config.auth.value;
		}
		const withCredentials =
			config.withCredentials ?? (config.auth?.type === 'cookie' || !config.auth);

		if (config.http) {
			this.http = config.http;
			const defaults = (this.http.defaults ??= {} as AxiosInstance['defaults']);
			if (config.baseURL !== undefined || config.baseUrl !== undefined) {
				defaults.baseURL = baseURL;
			}
			defaults.headers = defaults.headers ?? {};
			const common = ((defaults.headers as { common?: Record<string, unknown> }).common ??= {});
			Object.assign(common, headers);
			if (config.withCredentials !== undefined) {
				defaults.withCredentials = withCredentials;
			}
		} else {
			this.http = axios.create({
				baseURL,
				withCredentials,
				headers,
				adapter: typeof fetch === 'function' ? fetchAxiosAdapter : undefined,
			});
		}
	}

	get apiPrefix(): string {
		return this.#apiPrefix;
	}

	setConfig(patch: Pick<FormatClientConfig, 'baseURL' | 'baseUrl' | 'apiPrefix' | 'headers' | 'serviceKey'>): void {
		if (patch.baseURL !== undefined) this.http.defaults.baseURL = patch.baseURL;
		if (patch.baseUrl !== undefined) this.http.defaults.baseURL = patch.baseUrl;
		if (patch.apiPrefix !== undefined) this.#apiPrefix = patch.apiPrefix;
		if (patch.headers) Object.assign(this.http.defaults.headers.common, patch.headers);
		if (patch.serviceKey) this.http.defaults.headers.common['x-api-key'] = patch.serviceKey;
	}

	setAuthorizationHeader(value: string): void {
		this.http.defaults.headers.common.Authorization = value;
	}

	setResponseInterceptor(
		onFulfilled?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null,
		onRejected?: ((error: unknown) => unknown) | null,
		options?: AxiosInterceptorOptions,
	): number {
		return this.http.interceptors.response.use(onFulfilled, onRejected, options);
	}

	collectionPath(ref: ResourceRef): string {
		if (ref.path) return ref.path.replace(/\/+$/, '');
		const resource = ref.resource ?? '';
		return joinUrl(this.#apiPrefix, resource);
	}

	async search<T>(
		ref: ResourceRef,
		itemSchema?: ItemSchema<T>,
		body: IndexRequestBody = {},
		page: PageParams = { page: 1, limit: 100 },
		context = `POST ${ref.resource ?? ref.path ?? ''}/search`,
	): Promise<SearchResult<T>> {
		const url = `${this.collectionPath(ref)}/search?page=${page.page}&limit=${page.limit}`;
		try {
			const response = await this.http.post(url, sparseSearchBody(body));
			const envelope = parseApiEnvelope(response.data, context, response.status);
			const rawItems = extractSearchItems(envelope.data);
			const items = rawItems.map((item, index) =>
				parseResponse(itemSchema, item, `${context} item[${index}]`),
			);
			return {
				items,
				total: extractSearchTotal(envelope, items.length),
				page,
			};
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	async show<T>(
		ref: ResourceRef,
		id: string,
		itemSchema?: ItemSchema<T>,
		context = `GET ${ref.resource ?? ref.path ?? ''}/${id}`,
	): Promise<T> {
		const url = joinUrl(this.collectionPath(ref), id);
		return this.getPath(url, itemSchema, context);
	}

	/** GET an exact path (`/me`, OpenAPI item path). */
	async getPath<T>(path: string, itemSchema?: ItemSchema<T>, context = `GET ${path}`): Promise<T> {
		try {
			const response = await this.http.get(path);
			const envelope = parseApiEnvelope(response.data, context, response.status);
			return parseResponse(itemSchema, envelope.data, context);
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	/** Alias of show — REST GET by id. */
	get<T>(ref: ResourceRef, id: string, itemSchema?: ItemSchema<T>, context?: string): Promise<T> {
		return this.show(ref, id, itemSchema, context);
	}

	async store<T>(
		ref: ResourceRef,
		itemSchema: ItemSchema<T> | undefined,
		fields: Record<string, unknown>,
		options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
		context = `POST ${ref.resource ?? ref.path ?? ''}`,
	): Promise<T> {
		try {
			const response = await this.http.post(this.collectionPath(ref), writeBody(fields, options));
			const envelope = parseApiEnvelope(response.data, context, response.status);
			return parseResponse(itemSchema, envelope.data, context);
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	create<T>(
		ref: ResourceRef,
		itemSchema: ItemSchema<T> | undefined,
		fields: Record<string, unknown>,
		options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
		context?: string,
	): Promise<T> {
		return this.store(ref, itemSchema, fields, options, context);
	}

	async patch<T>(
		ref: ResourceRef,
		id: string,
		itemSchema: ItemSchema<T> | undefined,
		fields: Record<string, unknown>,
		options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
		context = `PATCH ${ref.resource ?? ref.path ?? ''}/${id}`,
	): Promise<T> {
		try {
			const response = await this.http.patch(joinUrl(this.collectionPath(ref), id), writeBody(fields, options));
			const envelope = parseApiEnvelope(response.data, context, response.status);
			return parseResponse(itemSchema, envelope.data, context);
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	async put<T>(
		ref: ResourceRef,
		id: string,
		itemSchema: ItemSchema<T> | undefined,
		fields: Record<string, unknown>,
		options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
		context = `PUT ${ref.resource ?? ref.path ?? ''}/${id}`,
	): Promise<T> {
		try {
			const response = await this.http.put(joinUrl(this.collectionPath(ref), id), writeBody(fields, options));
			const envelope = parseApiEnvelope(response.data, context, response.status);
			return parseResponse(itemSchema, envelope.data, context);
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	update<T>(
		ref: ResourceRef,
		id: string,
		itemSchema: ItemSchema<T> | undefined,
		fields: Record<string, unknown>,
		options?: { select?: SelectClause[]; relationships?: Record<string, unknown>; debug?: boolean },
		context?: string,
	): Promise<T> {
		return this.patch(ref, id, itemSchema, fields, options, context);
	}

	async destroy(ref: ResourceRef, id: string, context = `DELETE ${ref.resource ?? ref.path ?? ''}/${id}`): Promise<void> {
		try {
			const response = await this.http.delete(joinUrl(this.collectionPath(ref), id));
			if (response.status === 204 || response.data == null || response.data === '') return;
			parseApiEnvelope(response.data, context, response.status);
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, context);
		}
	}

	delete(ref: ResourceRef, id: string, context?: string): Promise<void> {
		return this.destroy(ref, id, context);
	}

	async loadOpenApi(docsPath = '/v3/api-docs'): Promise<unknown> {
		try {
			const response = await this.http.get(docsPath);
			return response.data;
		} catch (error) {
			if (error instanceof ApiClientError) throw error;
			wrapAxiosError(error, `GET ${docsPath}`);
		}
	}

	async send<T>(params: {
		method: CrudMethod;
		resource?: string;
		path?: string;
		schema?: ItemSchema<T>;
		id?: string;
		body?: IndexRequestBody;
		fields?: Record<string, unknown>;
		page?: PageParams;
		select?: SelectClause[];
		relationships?: Record<string, unknown>;
		debug?: boolean;
		context?: string;
	}): Promise<SearchResult<T> | T | void> {
		const ref: ResourceRef = { resource: params.resource, path: params.path };
		const opts = {
			select: params.select,
			relationships: params.relationships,
			debug: params.debug,
		};
		switch (params.method) {
			case 'SEARCH':
				return this.search(ref, params.schema, params.body ?? {}, params.page, params.context);
			case 'SHOW': {
				if (!params.id) throw new ApiClientError('SHOW requires id', params.context ?? 'SHOW');
				return this.show(ref, params.id, params.schema, params.context);
			}
			case 'STORE':
				return this.store(ref, params.schema, params.fields ?? {}, opts, params.context);
			case 'PATCH': {
				if (!params.id) throw new ApiClientError('PATCH requires id', params.context ?? 'PATCH');
				return this.patch(ref, params.id, params.schema, params.fields ?? {}, opts, params.context);
			}
			case 'PUT': {
				if (!params.id) throw new ApiClientError('PUT requires id', params.context ?? 'PUT');
				return this.put(ref, params.id, params.schema, params.fields ?? {}, opts, params.context);
			}
			case 'DESTROY': {
				if (!params.id) throw new ApiClientError('DESTROY requires id', params.context ?? 'DESTROY');
				return this.destroy(ref, params.id, params.context);
			}
			default: {
				const _exhaustive: never = params.method;
				throw new ApiClientError(`Unknown method: ${_exhaustive}`, 'send');
			}
		}
	}
}

/** @deprecated use FormatClient */
export type CrudClient = FormatClient;

export function createFormatClient(config?: FormatClientConfig): FormatClient {
	return new FormatClient(config);
}

/** @deprecated use createFormatClient */
export function createCrudClient(config?: FormatClientConfig): FormatClient {
	return createFormatClient(config);
}
