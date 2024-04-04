import IData from "./IData";
import IRelationships from "./IRelationships";

export default interface IOrmUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
    relationships?: IRelationships<any>;
}