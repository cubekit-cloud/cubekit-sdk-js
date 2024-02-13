import IData from "./IData";

export default interface IUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
}