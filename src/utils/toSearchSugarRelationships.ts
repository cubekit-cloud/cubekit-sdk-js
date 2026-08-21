import type IRelationships from "../interfaces/Orm/IRelationships";

function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	return value as Record<string, unknown>;
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
export function toSearchSugarRelationships<T = Record<string, unknown>>(
	relationships: IRelationships<T> | Record<string, unknown> | undefined,
): IRelationships<T> | undefined {
	if (!relationships || Object.keys(relationships).length === 0) return undefined;

	const result: IRelationships<T> = {};
	Object.keys(relationships).forEach((relationName) => {
		const record = asRecord((relationships as Record<string, unknown>)[relationName]);
		// Ignore nested relationships / RelationSpec fields — EMPTY only.
		void record;
		result[relationName] = {} as IRelationships<T>[string];
	});
	return result;
}
