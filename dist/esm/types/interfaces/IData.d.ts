import IDataRelationships from "./IDataRelationships";
export default interface IData<T> {
    fields?: T;
    relationships?: {
        [key: string]: IDataRelationships;
    };
}
//# sourceMappingURL=IData.d.ts.map