import IOrderParameter from "./IOrderParameter";
import ISelectParameter from "./ISelectParameter";
import IWhereParameter from "./IWhereParameter";

export default interface IRelationship<T> {
    select?: ISelectParameter<T>[];
    where?: IWhereParameter<T>[];
    order?: IOrderParameter<T>[];
}