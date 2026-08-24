import { AxiosInstance, AxiosResponse, AxiosInterceptorOptions, AxiosAdapter } from 'axios';

declare enum RelationsModesEnum {
    SYNC = "sync",
    ATTACH = "attach",
    DETACH = "detach"
}
declare enum AggregationsEnum {
    COUNT = "count",
    SUM = "sum",
    AVG = "avg",
    MIN = "min",
    MAX = "max"
}
declare enum OperatorsEnum {
    /** Join ON operator (itaces-crud SEARCH join[]). */
    EQ = "EQ",
    EQUAL = "=",
    INEQUAL = "!=",
    LIKE = "like",
    ILIKE = "ilike",
    MORE = ">",
    MORE_OR_EQUAL = ">=",
    LESS = "<",
    LESS_OR_EQUAL = "<="
}
declare enum FilterValueTypesEnum {
    POINTER = "pointer",
    SCALAR = "scalar"
}
declare enum FilterBooleansEnum {
    AND = "and",
    OR = "or"
}
declare enum FilterTypesEnum {
    GROUP = "group",
    SINGLE = "single"
}
declare enum JoinTypesEnum {
    LEFT = "left",
    RIGHT = "right",
    FULL = "full",
    INNER = "inner"
}
declare enum OrderDirectionsEnum {
    ASC = "asc",
    DESC = "desc"
}
declare enum OrderNullPositionsEnum {
    FIRST = "first",
    LAST = "last"
}
declare enum ResponseTypeEnum {
    RESOURCE = "resource",
    EXPORT = "export"
}
declare enum FileExportTypesEnum {
    XLSX = "xlsx",
    CSV = "csv"
}
declare enum ExportEncodingTypesEnum {
    UTF_8 = "utf-8",
    WINDOWS_1251 = "windows-1251"
}
declare enum RequestOrmMethodsEnum {
    SEARCH = "search",
    GET_BY_ID = "get_by_id",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}

interface IWhereParameter<T> {
    column?: keyof T;
    operator?: OperatorsEnum;
    value?: string | string[];
    value_type?: FilterValueTypesEnum;
    boolean?: FilterBooleansEnum;
    type?: FilterTypesEnum;
    group?: IWhereParameter<T>[];
}

interface ISelectParameter<T> {
    column?: keyof T;
    aggregation?: AggregationsEnum;
    alias?: string;
}

interface IPaginations {
    limit?: number;
    page?: number;
}

interface ICsvExportSettings {
    input_encoding?: ExportEncodingTypesEnum;
    output_encoding?: ExportEncodingTypesEnum;
}

interface IExportField<T> {
    column: keyof T;
    alias?: string;
}

interface IXlsxExportSettings {
    styles?: {
        [key: string]: boolean | string | number;
    };
}

interface IExportParameters<T> {
    file_name?: string;
    type?: FileExportTypesEnum;
    csv_settings?: ICsvExportSettings;
    xlsx_settings?: IXlsxExportSettings;
    fields: IExportField<T>[];
}

interface IJoinOnParameter {
    left?: string;
    operator?: OperatorsEnum;
    right?: string;
}

interface IJoinParameter<T> {
    type?: JoinTypesEnum;
    table?: string;
    on?: IJoinOnParameter[];
    where?: IWhereParameter<T>[];
}

interface IOrderParameter<T> {
    column?: keyof T;
    direction?: OrderDirectionsEnum;
    null_position?: OrderNullPositionsEnum;
}

/**
 * Read-side relation include (wire: RelationSpecRequest).
 * Parity with itaces-crud: select / where / order / pivot.
 * Nested `relationships` inside a relation is not part of the contract.
 */
interface IRelationship<T> {
    select?: ISelectParameter<T>[];
    where?: IWhereParameter<T>[];
    order?: IOrderParameter<T>[];
    /** Pivot columns for BELONGS_TO_MANY (JSON key `pivot`). */
    pivot?: string[];
}

interface IRelationships<T> {
    [key: string]: IRelationship<T>;
}

interface IOrmSearchOptions<T> {
    pagination?: IPaginations;
    select?: ISelectParameter<T>[];
    where?: IWhereParameter<T>[];
    join?: IJoinParameter<T>[];
    order?: IOrderParameter<T>[];
    group_by?: Array<keyof T>;
    return?: ResponseTypeEnum;
    export?: IExportParameters<T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
}

interface IOrmClientConfig {
    baseUrl?: string;
    baseURL?: string;
    serviceKey?: string;
    apiPrefix?: string;
    withCredentials?: boolean;
}

interface IDataRelationships {
    mode?: RelationsModesEnum;
    ids: string[];
}

interface IData<T> {
    fields?: T;
    relationships?: {
        [key: string]: IDataRelationships;
    };
}

interface IOrmCreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
    data: IData<T>;
}

interface IOrmDeleteOptions {
    id: string;
    debug?: boolean;
}

interface IOrmGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    relationships?: IRelationships<any>;
    debug?: boolean;
}

interface IOrmUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
    relationships?: IRelationships<any>;
}

interface IOrmRequestParameter<T> {
    path: string;
    method: RequestOrmMethodsEnum;
    options: IOrmSearchOptions<T> | IOrmGetByIdOptions<T> | IOrmCreateOptions<T> | IOrmUpdateOptions<T> | IOrmDeleteOptions;
}

interface IResponseMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface IResponse<T> {
    status: string;
    code: number;
    message: string;
    meta?: IResponseMeta;
    data: string | T | T[];
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
declare function toSearchSugarRelationships<T = Record<string, unknown>>(relationships: IRelationships<T> | Record<string, unknown> | undefined): IRelationships<T> | undefined;

/**
 * Depth-1 RelationSpec for SEARCH wire.
 * Keeps EMPTY `{}` and RelSpec fields (select/where/order/pivot).
 * Nested `relationships` are dropped, not sent.
 */
declare function normalizeSearchRelationships(relationships: Record<string, unknown> | undefined): Record<string, Record<string, unknown>> | undefined;

/** Minimal schema contract — Zod and passthrough both satisfy this. */
type ItemSchema<T> = {
    safeParse(data: unknown): {
        success: true;
        data: T;
    } | {
        success: false;
        error: {
            message: string;
        };
    };
};
/** Identity schema when the caller does not want Zod. */
declare const passthroughItemSchema: ItemSchema<unknown>;
declare function parseResponse<T>(schema: ItemSchema<T> | undefined, data: unknown, context: string): T;

type WhereClause = {
    column: string;
    value?: string | number | boolean | null;
    operator?: string;
    boolean?: 'and' | 'or';
    type?: string;
    group?: WhereClause[];
    value_type?: string;
};
type OrderClause = {
    column: string;
    direction?: 'asc' | 'desc';
    null_position?: 'first' | 'last';
};
type SelectClause = {
    column: string;
    aggregation?: string;
    alias?: string;
};
type JoinOnClause = {
    column?: string;
    left?: string;
    operator?: string;
    value?: string | number | boolean;
    right?: string;
};
type JoinClause = {
    table?: string;
    type?: string;
    on?: JoinOnClause[];
    where?: WhereClause[];
};
/** POST …/search body (IndexRequest wire, snake_case). Sparse: omit unused keys. */
type IndexRequestBody = {
    select?: SelectClause[];
    where?: WhereClause[];
    join?: JoinClause[];
    order?: OrderClause[];
    group_by?: string[];
    relationships?: Record<string, unknown>;
    return?: string | Record<string, unknown>;
    debug?: boolean;
};
type PageParams = {
    page: number;
    limit: number;
};
type SearchResult<T> = {
    items: T[];
    total: number;
    page: PageParams;
};
type StoreBody = {
    data: {
        fields: Record<string, unknown>;
        relationships?: Record<string, unknown>;
    };
    select?: SelectClause[];
    relationships?: Record<string, unknown>;
    debug?: boolean;
};
type UpdateBody = StoreBody;
type CrudMethod = 'SEARCH' | 'SHOW' | 'STORE' | 'PATCH' | 'PUT' | 'DESTROY';
type FormatClientAuth = {
    type: 'apiKey';
    value: string;
} | {
    type: 'cookie';
};
type FormatClientConfig = {
    http?: AxiosInstance;
    baseURL?: string;
    /** @deprecated use baseURL */
    baseUrl?: string;
    apiPrefix?: string;
    headers?: Record<string, string>;
    withCredentials?: boolean;
    /** x-api-key when not using inject http. */
    serviceKey?: string;
    auth?: FormatClientAuth;
};
/** @deprecated use FormatClientConfig */
type CrudClientConfig = FormatClientConfig;
type ResourceRef = {
    resource?: string;
    /** Full collection path; ignores apiPrefix+resource when set. */
    path?: string;
};

/** itaces-crud join ON operator (CUBV2-610). */
declare const JOIN_OPERATOR_EQ: "EQ";
/** Default missing join.on.operator to EQ. Does not invent join[] when absent. */
declare function normalizeJoin(join: JoinClause[] | undefined): JoinClause[] | undefined;

/** Read snapshot table name from an OpenAPI schema object (`x-orm-tableName`). */
declare function readOrmTableName(schema: unknown): string | undefined;
/** Collection path from a POST …/search OpenAPI path. */
declare function collectionPathFromSearchPath(searchPath: string): string | undefined;
/**
 * Resolve a resource collection path from OpenAPI paths keys.
 * Prefers an exact `POST {base}/search` whose last segment equals `resourceName`.
 */
declare function resourcePathFromOpenApi(doc: unknown, resourceName: string): string | undefined;

type ApiResponseEnvelope = {
    status: 'success' | 'error';
    code?: string | number;
    message?: string;
    data?: unknown;
    meta?: {
        pagination?: {
            current_page?: number;
            last_page?: number;
            per_page?: number;
            total?: number;
        };
        total?: number;
    } | null;
    errors?: unknown[];
};
declare class ApiClientError extends Error {
    readonly context: string;
    readonly code?: string | number | undefined;
    readonly errors?: unknown[] | undefined;
    readonly status?: number | undefined;
    constructor(message: string, context: string, code?: string | number | undefined, errors?: unknown[] | undefined, status?: number | undefined);
}
/** Parse itaces-crud envelope; throw on error status. */
declare function parseApiEnvelope(raw: unknown, context: string, httpStatus?: number): ApiResponseEnvelope;
declare function extractSearchItems(data: unknown): unknown[];
declare function extractSearchTotal(envelope: ApiResponseEnvelope, itemCount: number): number;

/**
 * itaces-crud format client (search/get/create/update/delete).
 * Transport is config (`baseURL`, cookie / x-api-key, or injected axios).
 */
declare class FormatClient {
    #private;
    readonly http: AxiosInstance;
    constructor(config?: FormatClientConfig);
    get apiPrefix(): string;
    setConfig(patch: Pick<FormatClientConfig, 'baseURL' | 'baseUrl' | 'apiPrefix' | 'headers' | 'serviceKey'>): void;
    setAuthorizationHeader(value: string): void;
    setResponseInterceptor(onFulfilled?: ((value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>) | null, onRejected?: ((error: unknown) => unknown) | null, options?: AxiosInterceptorOptions): number;
    collectionPath(ref: ResourceRef): string;
    search<T>(ref: ResourceRef, itemSchema?: ItemSchema<T>, body?: IndexRequestBody, page?: PageParams, context?: string): Promise<SearchResult<T>>;
    show<T>(ref: ResourceRef, id: string, itemSchema?: ItemSchema<T>, context?: string): Promise<T>;
    /** GET an exact path (`/me`, OpenAPI item path). */
    getPath<T>(path: string, itemSchema?: ItemSchema<T>, context?: string): Promise<T>;
    /** Alias of show — REST GET by id. */
    get<T>(ref: ResourceRef, id: string, itemSchema?: ItemSchema<T>, context?: string): Promise<T>;
    store<T>(ref: ResourceRef, itemSchema: ItemSchema<T> | undefined, fields: Record<string, unknown>, options?: {
        select?: SelectClause[];
        relationships?: Record<string, unknown>;
        debug?: boolean;
    }, context?: string): Promise<T>;
    create<T>(ref: ResourceRef, itemSchema: ItemSchema<T> | undefined, fields: Record<string, unknown>, options?: {
        select?: SelectClause[];
        relationships?: Record<string, unknown>;
        debug?: boolean;
    }, context?: string): Promise<T>;
    patch<T>(ref: ResourceRef, id: string, itemSchema: ItemSchema<T> | undefined, fields: Record<string, unknown>, options?: {
        select?: SelectClause[];
        relationships?: Record<string, unknown>;
        debug?: boolean;
    }, context?: string): Promise<T>;
    put<T>(ref: ResourceRef, id: string, itemSchema: ItemSchema<T> | undefined, fields: Record<string, unknown>, options?: {
        select?: SelectClause[];
        relationships?: Record<string, unknown>;
        debug?: boolean;
    }, context?: string): Promise<T>;
    update<T>(ref: ResourceRef, id: string, itemSchema: ItemSchema<T> | undefined, fields: Record<string, unknown>, options?: {
        select?: SelectClause[];
        relationships?: Record<string, unknown>;
        debug?: boolean;
    }, context?: string): Promise<T>;
    destroy(ref: ResourceRef, id: string, context?: string): Promise<void>;
    delete(ref: ResourceRef, id: string, context?: string): Promise<void>;
    loadOpenApi(docsPath?: string): Promise<unknown>;
    send<T>(params: {
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
    }): Promise<SearchResult<T> | T | void>;
}
/** @deprecated use FormatClient */
type CrudClient = FormatClient;
declare function createFormatClient(config?: FormatClientConfig): FormatClient;
/** @deprecated use createFormatClient */
declare function createCrudClient(config?: FormatClientConfig): FormatClient;

/**
 * Axios adapter over `fetch` so the same client works in Node/SSR and tests that stub fetch.
 */
declare const fetchAxiosAdapter: AxiosAdapter;

export { AggregationsEnum, ApiClientError, ApiResponseEnvelope, CrudClient, CrudClientConfig, CrudMethod, ExportEncodingTypesEnum, FileExportTypesEnum, FilterBooleansEnum, FilterTypesEnum, FilterValueTypesEnum, FormatClient, FormatClientAuth, FormatClientConfig, ICsvExportSettings, IData, IDataRelationships, IExportField, IExportParameters, IJoinOnParameter, IJoinParameter, IOrderParameter, IOrmClientConfig, IOrmCreateOptions, IOrmDeleteOptions, IOrmGetByIdOptions, IOrmSearchOptions, IOrmUpdateOptions, IPaginations, IRelationship, IRelationships, IOrmRequestParameter as IRequestParams, IResponse, IResponseMeta, ISelectParameter, IWhereParameter, IXlsxExportSettings, IndexRequestBody, ItemSchema, JOIN_OPERATOR_EQ, JoinClause, JoinOnClause, JoinTypesEnum, OperatorsEnum, OrderClause, OrderDirectionsEnum, OrderNullPositionsEnum, PageParams, RelationsModesEnum, RequestOrmMethodsEnum, ResourceRef, ResponseTypeEnum, SearchResult, SelectClause, StoreBody, UpdateBody, WhereClause, collectionPathFromSearchPath, createCrudClient, createFormatClient, extractSearchItems, extractSearchTotal, fetchAxiosAdapter, normalizeJoin, normalizeSearchRelationships, parseApiEnvelope, parseResponse, passthroughItemSchema, readOrmTableName, resourcePathFromOpenApi, toSearchSugarRelationships };
