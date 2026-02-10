import IOrmClientConfig from '../interfaces/Orm/IOrmClientConfig';
import IOrmRequestParameter from '../interfaces/Orm/IOrmRequestParameter';
import { IResponse, IWorkflowInstance } from '../interfaces/Orm';
import IProcessState from '../interfaces/Orm/Workflow/IProcessState';
import IWorkflowResponse from '../interfaces/Orm/response/IWorkflowResponse';
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
    send<T1, T2 = T1>(params: IOrmRequestParameter<T1>): Promise<import("axios").AxiosResponse<IResponse<T2>, any>>;
    private preparePathWithId;
    private search;
    private getById;
    private create;
    private update;
    private delete;
    getProcessState(tenantId: string, entityId: string): Promise<import("axios").AxiosResponse<IResponse<IProcessState>, any>>;
    startProcess(tenantId: string, workflowDefenitionId: string, entityId: string): Promise<import("axios").AxiosResponse<IWorkflowResponse, any>>;
    executeProcessAction(tenantId: string, workflowInstanceId: string, actionId: string, data: any): Promise<import("axios").AxiosResponse<IWorkflowInstance, any>>;
}
export default CubekitOrmClient;
//# sourceMappingURL=CubekitOrmClient.d.ts.map