import { toSearchSugarRelationships } from "./toSearchSugarRelationships";

describe("toSearchSugarRelationships", () => {
	it("returns undefined for empty input", () => {
		expect(toSearchSugarRelationships(undefined)).toBeUndefined();
		expect(toSearchSugarRelationships({})).toBeUndefined();
	});

	it("strips select/where/order/pivot into EMPTY {}", () => {
		expect(
			toSearchSugarRelationships({
				BookGenre: {
					select: [{ column: "id" }, { column: "name" }],
					where: [{ column: "id", value: "1" }],
					order: [{ column: "name", direction: "asc" }],
					pivot: ["qty"],
				},
			}),
		).toEqual({ BookGenre: {} });
	});

	it("drops nested relationships (depth-1 wire only)", () => {
		expect(
			toSearchSugarRelationships({
				customer: {
					select: [{ column: "id" }],
					relationships: {
						country: { select: [{ column: "name" }] },
					},
				},
			}),
		).toEqual({ customer: {} });
	});
});
