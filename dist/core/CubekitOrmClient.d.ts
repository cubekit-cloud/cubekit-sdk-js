import IClientConfig from '../interfaces/IClientConfig';
import IRequestParameter from '../interfaces/IRequestParameter';
import { IResponse } from '../interfaces';
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
    send<T1, T2 = T1>(params: IRequestParameter<T1>): Promise<import("axios").AxiosResponse<IResponse<T2>, any>>;
    private preparePathWithId;
    private search;
    private getById;
    private create;
    private update;
    private delete;
}
export default CubekitOrmClient;
//# sourceMappingURL=CubekitOrmClient.d.ts.map