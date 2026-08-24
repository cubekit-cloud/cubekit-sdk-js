import type { JoinClause, JoinOnClause } from './types';

/** itaces-crud join ON operator (CUBV2-610). */
export const JOIN_OPERATOR_EQ = 'EQ' as const;

function normalizeOn(on: JoinOnClause): JoinOnClause {
	if (on.operator && on.operator.length > 0) {
		return on;
	}
	return { ...on, operator: JOIN_OPERATOR_EQ };
}

/** Default missing join.on.operator to EQ. Does not invent join[] when absent. */
export function normalizeJoin(join: JoinClause[] | undefined): JoinClause[] | undefined {
	if (!join || join.length === 0) return undefined;
	return join.map((clause) => ({
		...clause,
		on: clause.on?.map(normalizeOn),
	}));
}
