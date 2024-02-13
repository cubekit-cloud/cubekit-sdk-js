import IData from "./IData";

export default interface ICreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
}