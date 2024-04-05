import { IStorageClientConfig } from '../interfaces/Storage';
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
export default CubekitStorageClient;
//# sourceMappingURL=CubekitStorageClient.d.ts.map