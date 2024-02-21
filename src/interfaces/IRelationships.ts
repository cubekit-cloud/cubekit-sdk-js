import IRelationship from "./IRelationship";

export default interface IRelationships<T> {
    [key: string]: IRelationship<T>;
}