import type { JoinClause } from './types';
/** itaces-crud join ON operator (CUBV2-610). */
export declare const JOIN_OPERATOR_EQ: "EQ";
/** Default missing join.on.operator to EQ. Does not invent join[] when absent. */
export declare function normalizeJoin(join: JoinClause[] | undefined): JoinClause[] | undefined;
//# sourceMappingURL=join.d.ts.map