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

export class ApiClientError extends Error {
	constructor(
		message: string,
		readonly context: string,
		readonly code?: string | number,
		readonly errors?: unknown[],
		readonly status?: number,
	) {
		super(message);
		this.name = 'ApiClientError';
	}
}

function asRecord(value: unknown): Record<string, unknown> | null {
	if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
	return value as Record<string, unknown>;
}

/** Parse itaces-crud envelope; throw on error status. */
export function parseApiEnvelope(raw: unknown, context: string, httpStatus?: number): ApiResponseEnvelope {
	const row = asRecord(raw);
	if (!row) {
		throw new ApiClientError(`${context}: invalid ApiResponse envelope`, context, undefined, undefined, httpStatus);
	}
	const statusRaw = String(row.status ?? '').toLowerCase();
	if (statusRaw !== 'success' && statusRaw !== 'error') {
		// Bare resource / DTO (no envelope) — treat as success data.
		if (row.status === undefined || row.status === null || row.status === '') {
			return { status: 'success', data: raw };
		}
		throw new ApiClientError(`${context}: invalid ApiResponse envelope`, context, undefined, undefined, httpStatus);
	}
	const envelope: ApiResponseEnvelope = {
		status: statusRaw,
		code: row.code as string | number | undefined,
		message: typeof row.message === 'string' ? row.message : undefined,
		data: row.data,
		meta: (row.meta as ApiResponseEnvelope['meta']) ?? undefined,
		errors: Array.isArray(row.errors) ? row.errors : undefined,
	};
	if (envelope.status === 'error') {
		throw new ApiClientError(
			envelope.message ?? `${context}: API error`,
			context,
			envelope.code,
			envelope.errors,
			httpStatus ?? (typeof envelope.code === 'number' ? envelope.code : undefined),
		);
	}
	return envelope;
}

export function extractSearchItems(data: unknown): unknown[] {
	if (Array.isArray(data)) return data;
	const row = asRecord(data);
	if (row) {
		if (Array.isArray(row.items)) return row.items;
		if (Array.isArray(row.data)) return row.data;
	}
	return [];
}

export function extractSearchTotal(envelope: ApiResponseEnvelope, itemCount: number): number {
	return envelope.meta?.pagination?.total ?? envelope.meta?.total ?? itemCount;
}
