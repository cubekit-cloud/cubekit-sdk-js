/** Minimal schema contract — Zod and passthrough both satisfy this. */
export type ItemSchema<T> = {
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
export declare const passthroughItemSchema: ItemSchema<unknown>;
export declare function parseResponse<T>(schema: ItemSchema<T> | undefined, data: unknown, context: string): T;
//# sourceMappingURL=parseResponse.d.ts.map