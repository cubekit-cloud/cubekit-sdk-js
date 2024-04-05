import IData from "./IData";
import IRelationships from "./IRelationships";
export default interface IOrmCreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
    data: IData<T>;
}
//# sourceMappingURL=IOrmCreateOptions.d.ts.map