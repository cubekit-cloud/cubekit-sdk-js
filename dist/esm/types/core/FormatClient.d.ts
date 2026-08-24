import { type AxiosInstance, type AxiosInterceptorOptions, type AxiosResponse } from 'axios';
import { type ItemSchema } from '../parseResponse';
import type { CrudMethod, FormatClientConfig, IndexRequestBody, PageParams, ResourceRef, SearchResult, SelectClause } from '../types';
/**
 * itaces-crud format client (search/get/create/update/delete).
 * Transport is config (`baseURL`, cookie / x-api-key, or injected axios).
 */
export declare class FormatClient {
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
export type CrudClient = FormatClient;
export declare function createFormatClient(config?: FormatClientConfig): FormatClient;
/** @deprecated use createFormatClient */
export declare function createCrudClient(config?: FormatClientConfig): FormatClient;
//# sourceMappingURL=FormatClient.d.ts.map