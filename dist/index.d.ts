import * as axios from 'axios';

declare enum OperatorsEnum {
    EQUAL = "=",
    INEQUAL = "!=",
    LIKE = "like",
    ILIKE = "ilike",
    MORE = ">",
    MORE_OR_EQUAL = ">=",
    LESS = "<",
    LESS_OR_EQUAL = "<="
}
declare enum FilterValueTypesEnum {
    POINTER = "pointer",
    SCALAR = "scalar"
}
declare enum FilterBooleansEnum {
    AND = "and",
    OR = "or"
}
declare enum FilterTypesEnum {
    GROUP = "group",
    SINGLE = "single"
}
declare enum JoinTypesEnum {
    LEFT = "left",
    RIGHT = "right",
    FULL = "full",
    INNER = "inner"
}
declare enum OrderDirectionsEnum {
    ASC = "asc",
    DESC = "desc"
}
declare enum OrderNullPositionsEnum {
    FIRST = "first",
    LAST = "last"
}
declare enum ResponseTypeEnum {
    RESOURCE = "resource",
    EXPORT = "export"
}
declare enum FileExportTypesEnum {
    XLSX = "xlsx",
    CSV = "csv"
}
declare enum ExportEncodingTypesEnum {
    UTF_8 = "utf-8",
    WINDOWS_1251 = "windows-1251"
}
declare enum RequestMethodsEnum {
    SEARCH = "search",
    GET_BY_ID = "get_by_id",
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete"
}

interface IWhereParameter<T> {
    column: keyof T;
    operator?: OperatorsEnum;
    value: string;
    value_type?: FilterValueTypesEnum;
    boolean?: FilterBooleansEnum;
    type?: FilterTypesEnum;
    group?: IWhereParameter<T>;
}

interface IPaginations {
    limit?: number;
    page?: number;
}

interface ICsvExportSettings {
    input_encoding?: ExportEncodingTypesEnum;
    output_encoding?: ExportEncodingTypesEnum;
}

interface IExportField<T> {
    column: keyof T;
    alias?: string;
}

interface IXlsxExportSettings {
    styles?: {
        [key: string]: boolean | string | number;
    };
}

interface IExportParameters<T> {
    file_name?: string;
    type?: FileExportTypesEnum;
    csv_settings?: ICsvExportSettings;
    xlsx_settings?: IXlsxExportSettings;
    fields: IExportField<T>[];
}

interface IJoinOnParameter {
    left?: string;
    operator?: OperatorsEnum;
    right?: string;
}

interface IJoinParameter<T> {
    type?: JoinTypesEnum;
    table?: string;
    on?: IJoinOnParameter[];
    where?: IWhereParameter<T>[];
}

interface IOrderParameter<T> {
    column?: keyof T;
    direction?: OrderDirectionsEnum;
    null_position?: OrderNullPositionsEnum;
}

interface IRelationship<T> {
    select?: Array<keyof T>;
    where?: IWhereParameter<T>[];
    order?: IOrderParameter<T>[];
}

interface IRelationships<T> {
    [key: string]: IRelationship<T>;
}

interface ISearchOptions<T> {
    pagination?: IPaginations;
    select?: Array<keyof T | '*'>;
    where?: IWhereParameter<T>[];
    join?: IJoinParameter<T>[];
    order?: IOrderParameter<T>[];
    group_by?: Array<keyof T>;
    return?: ResponseTypeEnum;
    export?: IExportParameters<T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
}

interface IClientConfig {
    baseUrl: string;
    serviceKey: string;
}

interface IData<T> {
    fields: T;
}

interface ICreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
}

interface IDeleteOptions {
    id: string;
    debug?: boolean;
}

interface IGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
}

interface IUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
}

interface IRequestParameter<T> {
    path: string;
    method: RequestMethodsEnum;
    options: ISearchOptions<T> | IGetByIdOptions<T> | ICreateOptions<T> | IUpdateOptions<T> | IDeleteOptions;
}

interface IResponseMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface IResponse<T> {
    status: string;
    code: number;
    message: string;
    meta?: IResponseMeta;
    data: string | T | T[];
}

declare class CubekitOrmClient {
    private axios;
    constructor(config: IClientConfig);
    /**
     * Set new configuration
     * @function setConfig
     * @param {IClientConfig} config - an object with new configuration
     * @example
     *const config: IClientConfig = {
     *  baseUrl: '/';
     *  serviceKey: 'xxxx-xxxx-xxxx-xxxx';
     *}
     *
     *client.setConfig(config);
     */
    setConfig(config: IClientConfig): void;
    /**
     * Send request to API cubkit.com with params.
     * @function send
     * @param {IRequestParameter<T>} params - A generic object containing all the necessary parameters for successful request.
     * @param {string} params.path Path to a exactly model in your application. It can be got from documentation on main page of your application.
     * @param {RequestMethodsEnum} params.method Request type.
     * @param {ISearchOptions<T> | IGetByIdOptions<T> | ICreateOptions<T> | IUpdateOptions<T> | IDeleteOptions} params.options Data to be sent.
     * @return {Promise<AxiosResponse<IResponse<T2>, any>>}
     * @example
     *interface A {
     *	id: string;
     *}
     *interface B extends A {
     *	name: string;
     *}
     *client.send<A, A>({
     *}).then((response) => {...}) //response.data.data will be string | A | A[]
     *client.send<A, B>({
     *}).then((response) => {...}) //response.data.data will be string | B | B[]
     */
    send<T1, T2 = T1>(params: IRequestParameter<T1>): Promise<axios.AxiosResponse<IResponse<T2>, any>>;
    private preparePathWithId;
    private search;
    private getById;
    private create;
    private update;
    private delete;
}
//# sourceMappingURL=CubekitOrmClient.d.ts.map

//# sourceMappingURL=index.d.ts.map

export { ExportEncodingTypesEnum, FileExportTypesEnum, FilterBooleansEnum, FilterTypesEnum, FilterValueTypesEnum, IClientConfig, ICreateOptions, ICsvExportSettings, IDeleteOptions, IExportField, IExportParameters, IGetByIdOptions, IJoinOnParameter, IJoinParameter, IOrderParameter, IPaginations, IRelationship, IRelationships, IRequestParameter as IRequestParams, IResponse, IResponseMeta, ISearchOptions, IUpdateOptions, IWhereParameter, IXlsxExportSettings, JoinTypesEnum, OperatorsEnum, OrderDirectionsEnum, OrderNullPositionsEnum, RequestMethodsEnum, ResponseTypeEnum, CubekitOrmClient as default };
