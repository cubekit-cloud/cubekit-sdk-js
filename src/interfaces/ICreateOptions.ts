import IData from "./IData";
import IRelationships from "./IRelationships";

export default interface ICreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
    data: IData<T>;
}