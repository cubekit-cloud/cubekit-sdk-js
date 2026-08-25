import axios, { AxiosError, isAxiosError } from 'axios';

var RelationsModesEnum;
(function (RelationsModesEnum) {
    RelationsModesEnum["SYNC"] = "sync";
    RelationsModesEnum["ATTACH"] = "attach";
    RelationsModesEnum["DETACH"] = "detach";
})(RelationsModesEnum || (RelationsModesEnum = {}));
var AggregationsEnum;
(function (AggregationsEnum) {
    AggregationsEnum["COUNT"] = "count";
    AggregationsEnum["SUM"] = "sum";
    AggregationsEnum["AVG"] = "avg";
    AggregationsEnum["MIN"] = "min";
    AggregationsEnum["MAX"] = "max";
})(AggregationsEnum || (AggregationsEnum = {}));
var OperatorsEnum;
(function (OperatorsEnum) {
    /** Join ON operator (itaces-crud SEARCH join[]). */
    OperatorsEnum["EQ"] = "EQ";
    OperatorsEnum["EQUAL"] = "=";
    OperatorsEnum["INEQUAL"] = "!=";
    OperatorsEnum["LIKE"] = "like";
    OperatorsEnum["ILIKE"] = "ilike";
    OperatorsEnum["MORE"] = ">";
    OperatorsEnum["MORE_OR_EQUAL"] = ">=";
    OperatorsEnum["LESS"] = "<";
    OperatorsEnum["LESS_OR_EQUAL"] = "<=";
})(OperatorsEnum || (OperatorsEnum = {}));
var FilterValueTypesEnum;
(function (FilterValueTypesEnum) {
    FilterValueTypesEnum["POINTER"] = "pointer";
    FilterValueTypesEnum["SCALAR"] = "scalar";
})(FilterValueTypesEnum || (FilterValueTypesEnum = {}));
var FilterBooleansEnum;
(function (FilterBooleansEnum) {
    FilterBooleansEnum["AND"] = "and";
    FilterBooleansEnum["OR"] = "or";
})(FilterBooleansEnum || (FilterBooleansEnum = {}));
var FilterTypesEnum;
(function (FilterTypesEnum) {
    FilterTypesEnum["GROUP"] = "group";
    FilterTypesEnum["SINGLE"] = "single";
})(FilterTypesEnum || (FilterTypesEnum = {}));
var JoinTypesEnum;
(function (JoinTypesEnum) {
    JoinTypesEnum["LEFT"] = "left";
    JoinTypesEnum["RIGHT"] = "right";
    JoinTypesEnum["FULL"] = "full";
    JoinTypesEnum["INNER"] = "inner";
})(JoinTypesEnum || (JoinTypesEnum = {}));
var OrderDirectionsEnum;
(function (OrderDirectionsEnum) {
    OrderDirectionsEnum["ASC"] = "asc";
    OrderDirectionsEnum["DESC"] = "desc";
})(OrderDirectionsEnum || (OrderDirectionsEnum = {}));
var OrderNullPositionsEnum;
(function (OrderNullPositionsEnum) {
    OrderNullPositionsEnum["FIRST"] = "first";
    OrderNullPositionsEnum["LAST"] = "last";
})(OrderNullPositionsEnum || (OrderNullPositionsEnum = {}));
var ResponseTypeEnum;
(function (ResponseTypeEnum) {
    ResponseTypeEnum["RESOURCE"] = "resource";
    ResponseTypeEnum["EXPORT"] = "export";
})(ResponseTypeEnum || (ResponseTypeEnum = {}));
var FileExportTypesEnum;
(function (FileExportTypesEnum) {
    FileExportTypesEnum["XLSX"] = "xlsx";
    FileExportTypesEnum["CSV"] = "csv";
})(FileExportTypesEnum || (FileExportTypesEnum = {}));
var ExportEncodingTypesEnum;
(function (ExportEncodingTypesEnum) {
    ExportEncodingTypesEnum["UTF_8"] = "utf-8";
    ExportEncodingTypesEnum["WINDOWS_1251"] = "windows-1251";
})(ExportEncodingTypesEnum || (ExportEncodingTypesEnum = {}));
var RequestOrmMethodsEnum;
(function (RequestOrmMethodsEnum) {
    RequestOrmMethodsEnum["SEARCH"] = "search";
    RequestOrmMethodsEnum["GET_BY_ID"] = "get_by_id";
    RequestOrmMethodsEnum["CREATE"] = "create";
    RequestOrmMethodsEnum["UPDATE"] = "update";
    RequestOrmMethodsEnum["DELETE"] = "delete";
})(RequestOrmMethodsEnum || (RequestOrmMethodsEnum = {}));

function asRecord$3(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return null;
    return value;
}
/**
 * Opt-in EMPTY sugar for SEARCH/index `relationships`.
 *
 * Maps each top-level relation name to `{}` (all exposed fields of the target).
 * Strips `select` / `where` / `order` / `pivot` and drops nested `relationships`
 * (backend RelationSpec is depth-1 only).
 *
 * Does not change SDK clients by default — call explicitly before wire send
 * when the edge requires sugar-only bodies.
 */
function toSearchSugarRelationships(relationships) {
    if (!relationships || Object.keys(relationships).length === 0)
        return undefined;
    const result = {};
    Object.keys(relationships).forEach((relationName) => {
        asRecord$3(relationships[relationName]);
        result[relationName] = {};
    });
    return result;
}

const REL_SPEC_KEYS = new Set(['select', 'where', 'order', 'pivot']);
function asRecord$2(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    return value;
}
/**
 * Depth-1 RelationSpec for SEARCH wire.
 * Keeps EMPTY `{}` and RelSpec fields (select/where/order/pivot).
 * Nested `relationships` are dropped, not sent.
 */
function normalizeSearchRelationships(relationships) {
    if (!relationships || Object.keys(relationships).length === 0)
        return undefined;
    const result = {};
    for (const [name, raw] of Object.entries(relationships)) {
        const record = asRecord$2(raw);
        if (!record) {
            result[name] = {};
            continue;
        }
        const spec = {};
        for (const key of REL_SPEC_KEYS) {
            if (rawHas(record, key))
                spec[key] = record[key];
        }
        result[name] = spec;
    }
    return result;
}
function rawHas(record, key) {
    return Object.prototype.hasOwnProperty.call(record, key) && record[key] !== undefined;
}

/** itaces-crud join ON operator (CUBV2-610). */
const JOIN_OPERATOR_EQ = 'EQ';
function normalizeOn(on) {
    if (on.operator && on.operator.length > 0) {
        return on;
    }
    return { ...on, operator: JOIN_OPERATOR_EQ };
}
/** Default missing join.on.operator to EQ. Does not invent join[] when absent. */
function normalizeJoin(join) {
    if (!join || join.length === 0)
        return undefined;
    return join.map((clause) => ({
        ...clause,
        on: clause.on?.map(normalizeOn),
    }));
}

function asRecord$1(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    return value;
}
/** Read snapshot table name from an OpenAPI schema object (`x-orm-tableName`). */
function readOrmTableName(schema) {
    const row = asRecord$1(schema);
    const value = row?.['x-orm-tableName'];
    return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}
const SEARCH_PATH_RE = /^(\/api\/v1(?:\.0)?\/.+?)\/search$/;
/** Collection path from a POST …/search OpenAPI path. */
function collectionPathFromSearchPath(searchPath) {
    const match = SEARCH_PATH_RE.exec(searchPath);
    return match?.[1];
}
/**
 * Resolve a resource collection path from OpenAPI paths keys.
 * Prefers an exact `POST {base}/search` whose last segment equals `resourceName`.
 */
function resourcePathFromOpenApi(doc, resourceName) {
    const root = asRecord$1(doc);
    const paths = asRecord$1(root?.paths);
    if (!paths)
        return undefined;
    const suffix = `/${resourceName}/search`;
    for (const path of Object.keys(paths)) {
        if (path.endsWith(suffix)) {
            return collectionPathFromSearchPath(path);
        }
    }
    return undefined;
}

class ApiClientError extends Error {
    context;
    code;
    errors;
    status;
    constructor(message, context, code, errors, status) {
        super(message);
        this.context = context;
        this.code = code;
        this.errors = errors;
        this.status = status;
        this.name = 'ApiClientError';
    }
}
function asRecord(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value))
        return null;
    return value;
}
/** Parse itaces-crud envelope; throw on error status. */
function parseApiEnvelope(raw, context, httpStatus) {
    const row = asRecord(raw);
    if (!row) {
        throw new ApiClientError(`${context}: invalid ApiResponse envelope`, context, undefined, undefined, httpStatus);
    }
    const statusRaw = String(row.status ?? '').toLowerCase();
    if (statusRaw !== 'success' && statusRaw !== 'error') {
        // Bare resource / DTO (no envelope) — treat as success data.
        if (row.status === undefined || row.status === null || row.status === '') {
            return { status: 'success', data: raw };
        }
        throw new ApiClientError(`${context}: invalid ApiResponse envelope`, context, undefined, undefined, httpStatus);
    }
    const envelope = {
        status: statusRaw,
        code: row.code,
        message: typeof row.message === 'string' ? row.message : undefined,
        data: row.data,
        meta: row.meta ?? undefined,
        errors: Array.isArray(row.errors) ? row.errors : undefined,
    };
    if (envelope.status === 'error') {
        throw new ApiClientError(envelope.message ?? `${context}: API error`, context, envelope.code, envelope.errors, httpStatus ?? (typeof envelope.code === 'number' ? envelope.code : undefined));
    }
    return envelope;
}
function extractSearchItems(data) {
    if (Array.isArray(data))
        return data;
    const row = asRecord(data);
    if (row) {
        if (Array.isArray(row.items))
            return row.items;
        if (Array.isArray(row.data))
            return row.data;
    }
    return [];
}
function extractSearchTotal(envelope, itemCount) {
    return envelope.meta?.pagination?.total ?? envelope.meta?.total ?? itemCount;
}

/** Identity schema when the caller does not want Zod. */
const passthroughItemSchema = {
    safeParse(data) {
        return { success: true, data };
    },
};
function parseResponse(schema, data, context) {
    if (!schema) {
        return data;
    }
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        throw new ApiClientError(`${context}: invalid response — ${parsed.error.message}`, context);
    }
    return parsed.data;
}

function headersToObject(headers) {
    const out = {};
    if (!headers || typeof headers.forEach !== 'function')
        return out;
    headers.forEach((value, key) => {
        out[key] = value;
    });
    return out;
}
/**
 * Axios adapter over `fetch` so the same client works in Node/SSR and tests that stub fetch.
 */
const fetchAxiosAdapter = async (config) => {
    const url = axios.getUri(config);
    const method = (config.method ?? 'get').toUpperCase();
    const headers = {};
    const headerBag = config.headers;
    if (headerBag && typeof headerBag.forEach === 'function') {
        headerBag.forEach((value, key) => {
            if (value === undefined || value === false)
                return;
            headers[key] = String(value);
        });
    }
    const body = method === 'GET' || method === 'HEAD'
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
    let data = text;
    if (text.trim()) {
        try {
            data = JSON.parse(text);
        }
        catch {
            data = text;
        }
    }
    else {
        data = '';
    }
    const axiosResponse = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: headersToObject(response.headers),
        config,
        request: undefined,
    };
    const valid = config.validateStatus?.(response.status) ?? (response.status >= 200 && response.status < 300);
    if (!valid) {
        throw new AxiosError(`Request failed with status code ${response.status}`, String(response.status), config, undefined, axiosResponse);
    }
    return axiosResponse;
};

const DEFAULT_API_PREFIX = '';
function joinUrl(prefix, ...parts) {
    const base = prefix.replace(/\/+$/, '');
    const rest = parts
        .filter((p) => p.length > 0)
        .map((p) => p.replace(/^\/+|\/+$/g, ''))
        .join('/');
    return rest ? `${base}/${rest}` : base;
}
function sparseSearchBody(body) {
    const out = {};
    if (body.select)
        out.select = body.select;
    if (body.where)
        out.where = body.where;
    const join = normalizeJoin(body.join);
    if (join)
        out.join = join;
    if (body.order)
        out.order = body.order;
    if (body.group_by)
        out.group_by = body.group_by;
    const relationships = normalizeSearchRelationships(body.relationships);
    if (relationships)
        out.relationships = relationships;
    if (body.return !== undefined)
        out.return = body.return;
    if (body.debug !== undefined)
        out.debug = body.debug;
    return out;
}
function writeBody(fields, options) {
    const data = { fields };
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
function wrapAxiosError(error, context) {
    if (isAxiosError(error)) {
        const status = error.response?.status;
        const payload = error.response?.data;
        const row = payload && typeof payload === 'object' && !Array.isArray(payload)
            ? payload
            : null;
        throw new ApiClientError((typeof row?.message === 'string' && row.message) || error.message || `${context}: HTTP error`, context, row?.code ?? status, Array.isArray(row?.errors) ? row.errors : undefined, status);
    }
    throw error;
}
/**
 * itaces-crud format client (search/get/create/update/delete).
 * Transport is config (`baseURL`, cookie / x-api-key, or injected axios).
 */
class FormatClient {
    http;
    #apiPrefix;
    constructor(config = {}) {
        this.#apiPrefix = config.apiPrefix ?? DEFAULT_API_PREFIX;
        const baseURL = config.baseURL ?? config.baseUrl ?? '/';
        const headers = {
            'Content-Type': 'application/json',
            ...config.headers,
        };
        if (config.serviceKey) {
            headers['x-api-key'] = config.serviceKey;
        }
        if (config.auth?.type === 'apiKey' && config.auth.value) {
            headers['x-api-key'] = config.auth.value;
        }
        const withCredentials = config.withCredentials ?? (config.auth?.type === 'cookie' || !config.auth);
        if (config.http) {
            this.http = config.http;
            const defaults = (this.http.defaults ??= {});
            if (config.baseURL !== undefined || config.baseUrl !== undefined) {
                defaults.baseURL = baseURL;
            }
            defaults.headers = defaults.headers ?? {};
            const common = (defaults.headers.common ??= {});
            Object.assign(common, headers);
            if (config.withCredentials !== undefined) {
                defaults.withCredentials = withCredentials;
            }
        }
        else {
            this.http = axios.create({
                baseURL,
                withCredentials,
                headers,
                adapter: typeof fetch === 'function' ? fetchAxiosAdapter : undefined,
            });
        }
    }
    get apiPrefix() {
        return this.#apiPrefix;
    }
    setConfig(patch) {
        if (patch.baseURL !== undefined)
            this.http.defaults.baseURL = patch.baseURL;
        if (patch.baseUrl !== undefined)
            this.http.defaults.baseURL = patch.baseUrl;
        if (patch.apiPrefix !== undefined)
            this.#apiPrefix = patch.apiPrefix;
        if (patch.headers)
            Object.assign(this.http.defaults.headers.common, patch.headers);
        if (patch.serviceKey)
            this.http.defaults.headers.common['x-api-key'] = patch.serviceKey;
    }
    setAuthorizationHeader(value) {
        this.http.defaults.headers.common.Authorization = value;
    }
    setResponseInterceptor(onFulfilled, onRejected, options) {
        return this.http.interceptors.response.use(onFulfilled, onRejected, options);
    }
    collectionPath(ref) {
        if (ref.path)
            return ref.path.replace(/\/+$/, '');
        const resource = ref.resource ?? '';
        return joinUrl(this.#apiPrefix, resource);
    }
    async search(ref, itemSchema, body = {}, page = { page: 1, limit: 100 }, context = `POST ${ref.resource ?? ref.path ?? ''}/search`) {
        const url = `${this.collectionPath(ref)}/search?page=${page.page}&limit=${page.limit}`;
        try {
            const response = await this.http.post(url, sparseSearchBody(body));
            const envelope = parseApiEnvelope(response.data, context, response.status);
            const rawItems = extractSearchItems(envelope.data);
            const items = rawItems.map((item, index) => parseResponse(itemSchema, item, `${context} item[${index}]`));
            return {
                items,
                total: extractSearchTotal(envelope, items.length),
                page,
            };
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    async show(ref, id, itemSchema, context = `GET ${ref.resource ?? ref.path ?? ''}/${id}`) {
        const url = joinUrl(this.collectionPath(ref), id);
        return this.getPath(url, itemSchema, context);
    }
    /** GET an exact path (`/me`, OpenAPI item path). */
    async getPath(path, itemSchema, context = `GET ${path}`) {
        try {
            const response = await this.http.get(path);
            const envelope = parseApiEnvelope(response.data, context, response.status);
            return parseResponse(itemSchema, envelope.data, context);
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    /** Alias of show — REST GET by id. */
    get(ref, id, itemSchema, context) {
        return this.show(ref, id, itemSchema, context);
    }
    async store(ref, itemSchema, fields, options, context = `POST ${ref.resource ?? ref.path ?? ''}`) {
        try {
            const response = await this.http.post(this.collectionPath(ref), writeBody(fields, options));
            const envelope = parseApiEnvelope(response.data, context, response.status);
            return parseResponse(itemSchema, envelope.data, context);
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    create(ref, itemSchema, fields, options, context) {
        return this.store(ref, itemSchema, fields, options, context);
    }
    async patch(ref, id, itemSchema, fields, options, context = `PATCH ${ref.resource ?? ref.path ?? ''}/${id}`) {
        try {
            const response = await this.http.patch(joinUrl(this.collectionPath(ref), id), writeBody(fields, options));
            const envelope = parseApiEnvelope(response.data, context, response.status);
            return parseResponse(itemSchema, envelope.data, context);
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    async put(ref, id, itemSchema, fields, options, context = `PUT ${ref.resource ?? ref.path ?? ''}/${id}`) {
        try {
            const response = await this.http.put(joinUrl(this.collectionPath(ref), id), writeBody(fields, options));
            const envelope = parseApiEnvelope(response.data, context, response.status);
            return parseResponse(itemSchema, envelope.data, context);
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    update(ref, id, itemSchema, fields, options, context) {
        return this.patch(ref, id, itemSchema, fields, options, context);
    }
    async destroy(ref, id, context = `DELETE ${ref.resource ?? ref.path ?? ''}/${id}`) {
        try {
            const response = await this.http.delete(joinUrl(this.collectionPath(ref), id));
            if (response.status === 204 || response.data == null || response.data === '')
                return;
            parseApiEnvelope(response.data, context, response.status);
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, context);
        }
    }
    delete(ref, id, context) {
        return this.destroy(ref, id, context);
    }
    async loadOpenApi(docsPath = '/v3/api-docs') {
        try {
            const response = await this.http.get(docsPath);
            return response.data;
        }
        catch (error) {
            if (error instanceof ApiClientError)
                throw error;
            wrapAxiosError(error, `GET ${docsPath}`);
        }
    }
    async send(params) {
        const ref = { resource: params.resource, path: params.path };
        const opts = {
            select: params.select,
            relationships: params.relationships,
            debug: params.debug,
        };
        switch (params.method) {
            case 'SEARCH':
                return this.search(ref, params.schema, params.body ?? {}, params.page, params.context);
            case 'SHOW': {
                if (!params.id)
                    throw new ApiClientError('SHOW requires id', params.context ?? 'SHOW');
                return this.show(ref, params.id, params.schema, params.context);
            }
            case 'STORE':
                return this.store(ref, params.schema, params.fields ?? {}, opts, params.context);
            case 'PATCH': {
                if (!params.id)
                    throw new ApiClientError('PATCH requires id', params.context ?? 'PATCH');
                return this.patch(ref, params.id, params.schema, params.fields ?? {}, opts, params.context);
            }
            case 'PUT': {
                if (!params.id)
                    throw new ApiClientError('PUT requires id', params.context ?? 'PUT');
                return this.put(ref, params.id, params.schema, params.fields ?? {}, opts, params.context);
            }
            case 'DESTROY': {
                if (!params.id)
                    throw new ApiClientError('DESTROY requires id', params.context ?? 'DESTROY');
                return this.destroy(ref, params.id, params.context);
            }
            default: {
                const _exhaustive = params.method;
                throw new ApiClientError(`Unknown method: ${_exhaustive}`, 'send');
            }
        }
    }
}
function createFormatClient(config) {
    return new FormatClient(config);
}
/** @deprecated use createFormatClient */
function createCrudClient(config) {
    return createFormatClient(config);
}

export { AggregationsEnum, ApiClientError, ExportEncodingTypesEnum, FileExportTypesEnum, FilterBooleansEnum, FilterTypesEnum, FilterValueTypesEnum, FormatClient, JOIN_OPERATOR_EQ, JoinTypesEnum, OperatorsEnum, OrderDirectionsEnum, OrderNullPositionsEnum, RelationsModesEnum, RequestOrmMethodsEnum, ResponseTypeEnum, collectionPathFromSearchPath, createCrudClient, createFormatClient, extractSearchItems, extractSearchTotal, fetchAxiosAdapter, normalizeJoin, normalizeSearchRelationships, parseApiEnvelope, parseResponse, passthroughItemSchema, readOrmTableName, resourcePathFromOpenApi, toSearchSugarRelationships };
//# sourceMappingURL=index.js.map
