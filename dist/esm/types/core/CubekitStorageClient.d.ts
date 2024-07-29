import { AxiosProgressEvent, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';
import { IStorageClientConfig, IUploadFileResponse } from '../interfaces/Storage';
import ICreateDirectoryResponse from '../interfaces/Storage/ICreateDirectoryResponse';
import IMoveResponse from '../interfaces/Storage/IMoveResponse';
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
    constructor(config: IStorageClientConfig);
    /**
     * Set new configuration
     * @method CubekitStorageClient.setConfig
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
     * @method CubekitStorageClient.setAuthorizationHeader
     * @param {string} value - a string with auth data
     * @example
     *
     *storageClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
     */
    setAuthorizationHeader(value: string): void;
    /**
     * Get folder tree
     * @method CubekitStorageClient.getFolderTree
     * @example
     *
     *storageClient.getFolderTree();
     */
    getFolderTree(path?: string): Promise<import("../interfaces/Storage").IFolderInTree[]>;
    /**
     * Get avaliable folders and files
     * @method CubekitStorageClient.view
     * @example
     *
     *storageClient.view();
     */
    view(path?: string, order_by?: string, order?: string, filter_by?: string, filter?: string): Promise<import("../interfaces/Storage").IStorageFile[]>;
    /**
     * Create directory
     * @method CubekitStorageClient.createDirectory
     * @example
     *
     *storageClient.createDirectory();
     */
    createDirectory(path: string): Promise<ICreateDirectoryResponse>;
    /**
     * Delete directory or file
     * @method CubekitStorageClient.delete
     * @example
     *
     *storageClient.delete();
     */
    delete(paths: string[]): Promise<any>;
    /**
     * Upload file (with a require file name)
     * @method CubekitStorageClient.upload
     * @example
     *
     *storageClient.upload();
     */
    upload(path: string, files: File[], onUploadProgress?: (progressEvent: AxiosProgressEvent) => void, signal?: GenericAbortSignal): Promise<IUploadFileResponse>;
    /**
     * Resend request
     * @method CubekitStorageClient.resend
     * @example
     *
     *storageClient.resend();
     */
    resend(config: InternalAxiosRequestConfig): Promise<any>;
    /**
     * Simple upload file (without file name)
     * @method CubekitStorageClient.simpleUpload
     * @example
     *
     *storageClient.simpleUpload();
     */
    simpleUpload(path: string, files: File[], onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined, signal?: GenericAbortSignal): Promise<IUploadFileResponse>;
    /**
     * Move directory or file
     * @method CubekitStorageClient.move
     * @example
     *
     *storageClient.move();
     */
    move(source: string, target: string): Promise<IMoveResponse>;
    /**
     * Download objects
     * @method CubekitStorageClient.download
     * @example
     *
     *storageClient.download();
     */
    download(path: string, objects: string[]): Promise<import("axios").AxiosResponse<any, any>>;
}
export default CubekitStorageClient;
//# sourceMappingURL=CubekitStorageClient.d.ts.map