export default interface IGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
}