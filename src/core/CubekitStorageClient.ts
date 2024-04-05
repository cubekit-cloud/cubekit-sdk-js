import axios, { AxiosInstance } from 'axios';
import { IStorageClientConfig } from '../interfaces/Storage';

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
	 * @function setConfig
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
	 * @function setAuthorizationHeader
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
