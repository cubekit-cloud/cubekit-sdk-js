import IData from "./IData";
import IRelationships from "./IRelationships";
export default interface IUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
    relationships?: IRelationships<any>;
}
//# sourceMappingURL=IUpdateOptions.d.ts.map