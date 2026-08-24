/**
 * Depth-1 RelationSpec for SEARCH wire.
 * Keeps EMPTY `{}` and RelSpec fields (select/where/order/pivot).
 * Nested `relationships` are dropped, not sent.
 */
export declare function normalizeSearchRelationships(relationships: Record<string, unknown> | undefined): Record<string, Record<string, unknown>> | undefined;
//# sourceMappingURL=relationships.d.ts.map