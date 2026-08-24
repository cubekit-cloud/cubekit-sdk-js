export type ApiResponseEnvelope = {
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
export declare class ApiClientError extends Error {
    readonly context: string;
    readonly code?: string | number | undefined;
    readonly errors?: unknown[] | undefined;
    readonly status?: number | undefined;
    constructor(message: string, context: string, code?: string | number | undefined, errors?: unknown[] | undefined, status?: number | undefined);
}
/** Parse itaces-crud envelope; throw on error status. */
export declare function parseApiEnvelope(raw: unknown, context: string, httpStatus?: number): ApiResponseEnvelope;
export declare function extractSearchItems(data: unknown): unknown[];
export declare function extractSearchTotal(envelope: ApiResponseEnvelope, itemCount: number): number;
//# sourceMappingURL=envelope.d.ts.map