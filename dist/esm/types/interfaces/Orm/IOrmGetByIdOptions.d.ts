import IRelationships from "./IRelationships";
export default interface IOrmGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    relationships?: IRelationships<any>;
    debug?: boolean;
}
//# sourceMappingURL=IOrmGetByIdOptions.d.ts.map