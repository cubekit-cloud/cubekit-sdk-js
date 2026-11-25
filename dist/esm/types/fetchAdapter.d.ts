import { type AxiosAdapter } from 'axios';
/**
 * AxiosHeaders has toJSON, not forEach. Missing Content-Type on POST makes Page Builder 500.
 */
export declare function requestHeadersToObject(headerBag: unknown): Record<string, string>;
/**
 * Axios adapter over `fetch` so the same client works in Node/SSR and tests that stub fetch.
 */
export declare const fetchAxiosAdapter: AxiosAdapter;
//# sourceMappingURL=fetchAdapter.d.ts.map