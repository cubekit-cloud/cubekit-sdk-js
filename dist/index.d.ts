import * as axios from 'axios';

declare enum RelationsModesEnum {
    SYNC = "sync",
    ATTACH = "attach",
    DETACH = "detach"
}
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
declare enum RequestOrmMethodsEnum {
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

interface IOrmSearchOptions<T> {
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

interface IOrmClientConfig {
    baseUrl: string;
    serviceKey: string;
}

interface IDataRelationships {
    mode?: RelationsModesEnum;
    ids: string[];
}

interface IData<T> {
    fields?: T;
    relationships?: {
        [key: string]: IDataRelationships;
    };
}

interface IOrmCreateOptions<T> {
    select?: Array<keyof T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
    data: IData<T>;
}

interface IOrmDeleteOptions {
    id: string;
    debug?: boolean;
}

interface IOrmGetByIdOptions<T> {
    id: string;
    select?: Array<keyof T>;
    relationships?: IRelationships<any>;
    debug?: boolean;
}

interface IOrmUpdateOptions<T> {
    id: string;
    select?: Array<keyof T>;
    debug?: boolean;
    data: IData<T>;
    relationships?: IRelationships<any>;
}

interface IOrmRequestParameter<T> {
    path: string;
    method: RequestOrmMethodsEnum;
    options: IOrmSearchOptions<T> | IOrmGetByIdOptions<T> | IOrmCreateOptions<T> | IOrmUpdateOptions<T> | IOrmDeleteOptions;
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

interface IStorageClientConfig {
    baseUrl: string;
    serviceKey: string;
    storageId: string;
}

/**
 * @class
 * ```ts
    // CubekitOrmClient is needed for working with auto generated ORM API
    import { IOrmClientConfig, CubekitOrmClient } from '@cubekit-cloud/cubekit-sdk-js';
    // You can get your configuration from your application page.
    const config: IOrmClientConfig = {
        baseUrl: 'url';
        serviceKey: 'key';
    };
    const ormClient = new CubekitOrmClient(config);
    ormClient.send({...});
* ```
*/
declare class CubekitOrmClient {
    private axios;
    constructor(config: IOrmClientConfig);
    /**
     * Set new configuration
     * @function setConfig
     * @method CubekitOrmClient~setConfig
     * @param {IOrmClientConfig} config - an object with new configuration
     * @example
     *const config: IOrmClientConfig = {
     *  baseUrl: '/';
     *  serviceKey: 'xxxx-xxxx-xxxx-xxxx';
     *}
     *
     *ormClient.setConfig(config);
     */
    setConfig(config: IOrmClientConfig): void;
    /**
     * Set authorization header
     * @method CubekitOrmClient~setAuthorizationHeader
     * @param {string} value - a string with auth data
     * @example
     *
     *ormClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
     */
    setAuthorizationHeader(value: string): void;
    /**
     * Send request to API cubkit.com with params.
     * @method CubekitOrmClient~send
     * @param {IOrmRequestParameter<T>} params - A generic object containing all the necessary parameters for successful request.
     * @param {string} params.path Path to a exactly model in your application. It can be got from documentation on main page of your application.
     * @param {RequestOrmMethodsEnum} params.method Request type.
     * @param {ISearchOptions<T> | IGetByIdOptions<T> | ICreateOptions<T> | IUpdateOptions<T> | IDeleteOptions} params.options Data to be sent.
     * @return {Promise<AxiosResponse<IResponse<T2>, any>>}
     * @example
     *interface A {
     *	id: string;
     *}
     *interface B extends A {
     *	name: string;
     *}
     *ormClient.send<A, A>({
     *}).then((response) => {...}) //response.data.data can be able to string | A | A[]
     *ormClient.send<A, B>({
     *}).then((response) => {...}) //response.data.data can be able to string | B | B[]
     */
    send<T1, T2 = T1>(params: IOrmRequestParameter<T1>): Promise<axios.AxiosResponse<IResponse<T2>, any>>;
    private preparePathWithId;
    private search;
    private getById;
    private create;
    private update;
    private delete;
}
//# sourceMappingURL=CubekitOrmClient.d.ts.map

/**
 * @class
 * ```ts
    // CubekitStorageClient is needed for working with auto generated Storage API
    import { IStorageClientConfig, CubekitStorageClient } from '@cubekit-cloud/cubekit-sdk-js';
    // You can get your configuration from your application page.
    const config: IStorageClientConfig = {
        baseUrl: 'url';
        serviceKey: 'key';
        storageId: 'id';
    };
    const storageClient = new CubekitStorageClient(config);
    storageClient.upload({...});
* ```
*/
declare class CubekitStorageClient {
    private axios;
    private storageId;
    constructor(config: IStorageClientConfig);
    /**
     * Set new configuration
     * @method CubekitStorageClient~setConfig
     * @param {IStorageClientConfig} config - an object with new configuration
     * @example
     *const config: IStorageClientConfig = {
     *  baseUrl: '/';
     *  serviceKey: 'xxxx-xxxx-xxxx-xxxx';
     *  storageId: 'xxxx-xxxx-xxxx-xxxx';
     *}
     *
     *storageClient.setConfig(config);
     */
    setConfig(config: IStorageClientConfig): void;
    /**
     * Set authorization header
     * @method CubekitStorageClient~setAuthorizationHeader
     * @param {string} value - a string with auth data
     * @example
     *
     *storageClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
     */
    setAuthorizationHeader(value: string): void;
}
//# sourceMappingURL=CubekitStorageClient.d.ts.map

export { CubekitOrmClient, CubekitStorageClient, ExportEncodingTypesEnum, FileExportTypesEnum, FilterBooleansEnum, FilterTypesEnum, FilterValueTypesEnum, ICsvExportSettings, IData, IDataRelationships, IExportField, IExportParameters, IJoinOnParameter, IJoinParameter, IOrderParameter, IOrmClientConfig, IOrmCreateOptions, IOrmDeleteOptions, IOrmGetByIdOptions, IOrmSearchOptions, IOrmUpdateOptions, IPaginations, IRelationship, IRelationships, IOrmRequestParameter as IRequestParams, IResponse, IResponseMeta, IStorageClientConfig, IWhereParameter, IXlsxExportSettings, JoinTypesEnum, OperatorsEnum, OrderDirectionsEnum, OrderNullPositionsEnum, RelationsModesEnum, RequestOrmMethodsEnum, ResponseTypeEnum };
