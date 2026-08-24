function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	return value as Record<string, unknown>;
}

/** Read snapshot table name from an OpenAPI schema object (`x-orm-tableName`). */
export function readOrmTableName(schema: unknown): string | undefined {
	const row = asRecord(schema);
	const value = row?.['x-orm-tableName'];
	return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

const SEARCH_PATH_RE = /^(\/api\/v1(?:\.0)?\/.+?)\/search$/;

/** Collection path from a POST …/search OpenAPI path. */
export function collectionPathFromSearchPath(searchPath: string): string | undefined {
	const match = SEARCH_PATH_RE.exec(searchPath);
	return match?.[1];
}

/**
 * Resolve a resource collection path from OpenAPI paths keys.
 * Prefers an exact `POST {base}/search` whose last segment equals `resourceName`.
 */
export function resourcePathFromOpenApi(doc: unknown, resourceName: string): string | undefined {
	const root = asRecord(doc);
	const paths = asRecord(root?.paths);
	if (!paths) return undefined;
	const suffix = `/${resourceName}/search`;
	for (const path of Object.keys(paths)) {
		if (path.endsWith(suffix)) {
			return collectionPathFromSearchPath(path);
		}
	}
	return undefined;
}
