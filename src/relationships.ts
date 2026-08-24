const REL_SPEC_KEYS = new Set(['select', 'where', 'order', 'pivot']);

function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	return value as Record<string, unknown>;
}

/**
 * Depth-1 RelationSpec for SEARCH wire.
 * Keeps EMPTY `{}` and RelSpec fields (select/where/order/pivot).
 * Nested `relationships` are dropped, not sent.
 */
export function normalizeSearchRelationships(
	relationships: Record<string, unknown> | undefined,
): Record<string, Record<string, unknown>> | undefined {
	if (!relationships || Object.keys(relationships).length === 0) return undefined;

	const result: Record<string, Record<string, unknown>> = {};
	for (const [name, raw] of Object.entries(relationships)) {
		const record = asRecord(raw);
		if (!record) {
			result[name] = {};
			continue;
		}
		const spec: Record<string, unknown> = {};
		for (const key of REL_SPEC_KEYS) {
			if (rawHas(record, key)) spec[key] = record[key];
		}
		result[name] = spec;
	}
	return result;
}

function rawHas(record: Record<string, unknown>, key: string): boolean {
	return Object.prototype.hasOwnProperty.call(record, key) && record[key] !== undefined;
}
