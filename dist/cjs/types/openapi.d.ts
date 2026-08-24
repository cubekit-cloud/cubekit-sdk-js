/** Read snapshot table name from an OpenAPI schema object (`x-orm-tableName`). */
export declare function readOrmTableName(schema: unknown): string | undefined;
/** Collection path from a POST …/search OpenAPI path. */
export declare function collectionPathFromSearchPath(searchPath: string): string | undefined;
/**
 * Resolve a resource collection path from OpenAPI paths keys.
 * Prefers an exact `POST {base}/search` whose last segment equals `resourceName`.
 */
export declare function resourcePathFromOpenApi(doc: unknown, resourceName: string): string | undefined;
//# sourceMappingURL=openapi.d.ts.map