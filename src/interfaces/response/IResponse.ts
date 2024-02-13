import IResponseMeta from "./IResponseMeta";

export default interface IResponse<T> {
    status: string;
    code: number;
    message: string;
    meta?: IResponseMeta;
    data: string | T | T[];
}