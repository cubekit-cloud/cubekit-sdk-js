import { ApiClientError } from './envelope';

/** Minimal schema contract — Zod and passthrough both satisfy this. */
export type ItemSchema<T> = {
	safeParse(data: unknown): { success: true; data: T } | { success: false; error: { message: string } };
};

/** Identity schema when the caller does not want Zod. */
export const passthroughItemSchema: ItemSchema<unknown> = {
	safeParse(data: unknown) {
		return { success: true, data };
	},
};

export function parseResponse<T>(schema: ItemSchema<T> | undefined, data: unknown, context: string): T {
	if (!schema) {
		return data as T;
	}
	const parsed = schema.safeParse(data);
	if (!parsed.success) {
		throw new ApiClientError(`${context}: invalid response — ${parsed.error.message}`, context);
	}
	return parsed.data;
}
