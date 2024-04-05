import axios, { AxiosInstance } from 'axios';
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
class CubekitStorageClient {
	private axios: AxiosInstance;
	private storageId: string | null = null;

	constructor(config: IStorageClientConfig) {
		this.storageId = config.storageId;
		this.axios = axios.create({
			baseURL: config.baseUrl,
			withCredentials: true,
			headers: {
				['x-api-key']: config.serviceKey,
			},
		});
	};

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
	public setConfig(config: IStorageClientConfig) {
		this.storageId = config.storageId;
		this.axios.defaults.baseURL = config.baseUrl;
		this.axios.defaults.headers['x-api-key'] = config.serviceKey;
	};

	/**
	 * Set authorization header
	 * @method CubekitStorageClient~setAuthorizationHeader
	 * @param {string} value - a string with auth data
	 * @example
	 *
	 *storageClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
	 */
	public setAuthorizationHeader(value: string) {
		this.axios.defaults.headers['Authorization'] = value;
	};
}

export default CubekitStorageClient;
