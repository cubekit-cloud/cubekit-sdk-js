import type IRelationships from "../interfaces/Orm/IRelationships";
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
export declare function toSearchSugarRelationships<T = Record<string, unknown>>(relationships: IRelationships<T> | Record<string, unknown> | undefined): IRelationships<T> | undefined;
//# sourceMappingURL=toSearchSugarRelationships.d.ts.map