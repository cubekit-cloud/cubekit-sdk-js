import IOrderParameter from "./IOrderParameter";
import ISelectParameter from "./ISelectParameter";
import IWhereParameter from "./IWhereParameter";

/**
 * Read-side relation include (wire: RelationSpecRequest).
 * Parity with itaces-crud: select / where / order / pivot.
 * Nested `relationships` inside a relation is not part of the contract.
 */
export default interface IRelationship<T> {
    select?: ISelectParameter<T>[];
    where?: IWhereParameter<T>[];
    order?: IOrderParameter<T>[];
    /** Pivot columns for BELONGS_TO_MANY (JSON key `pivot`). */
    pivot?: string[];
}
