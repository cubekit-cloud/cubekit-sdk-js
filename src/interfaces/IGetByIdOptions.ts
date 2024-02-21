import IRelationships from "./IRelationships";

export default interface IGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    relationships?: IRelationships<any>;
    debug?: boolean;
}