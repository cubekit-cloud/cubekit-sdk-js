import IOrderParameter from "./IOrderParameter";
import IWhereParameter from "./IWhereParameter";
export default interface IRelationship<T> {
    select?: Array<keyof T>;
    where?: IWhereParameter<T>[];
    order?: IOrderParameter<T>[];
}
//# sourceMappingURL=IRelationship.d.ts.map