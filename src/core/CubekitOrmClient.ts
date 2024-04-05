import axios, { AxiosInstance } from 'axios';
import IOrmClientConfig from '../interfaces/Orm/IOrmClientConfig';
import IOrmRequestParameter from '../interfaces/Orm/IOrmRequestParameter';
import {
	IResponse,
	IOrmGetByIdOptions,
	IOrmSearchOptions,
	IOrmUpdateOptions,
	IOrmDeleteOptions,
} from '../interfaces/Orm';
import { RequestOrmMethodsEnum } from '../enums';

const ID_SPOT = '{key}';

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
class CubekitOrmClient {
	private axios: AxiosInstance;

	constructor(config: IOrmClientConfig) {
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
	public setConfig(config: IOrmClientConfig) {
		this.axios.defaults.baseURL = config.baseUrl;
		this.axios.defaults.headers['x-api-key'] = config.serviceKey;
	};

	/**
	 * Set authorization header
	 * @method CubekitOrmClient~setAuthorizationHeader
	 * @param {string} value - a string with auth data
	 * @example
	 *
	 *ormClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
	 */
	public setAuthorizationHeader(value: string) {
		this.axios.defaults.headers['Authorization'] = value;
	};

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
	public send<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		switch (params.method) {
			case RequestOrmMethodsEnum.GET_BY_ID:
				return this.getById<T1, T2>(params);
			case RequestOrmMethodsEnum.CREATE:
				return this.create<T1, T2>(params);
			case RequestOrmMethodsEnum.UPDATE:
				return this.update<T1, T2>(params);
			case RequestOrmMethodsEnum.DELETE:
				return this.delete<T1, T2>(params);
			default:
				return this.search<T1, T2>(params);
		}
	};

	private preparePathWithId(path: string, id: string) {
		if (path.indexOf(ID_SPOT) > -1) {
			path = path.replace(ID_SPOT, id);
		} else if (path.slice(-1) === '/') {
			path = `${path}${id}`;
		} else {
			path = `${path}/${id}`;
		}

		return path;
	}

	private search<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		let url = params.path;
		const options = params.options as IOrmSearchOptions<T1>;
		if (options.pagination) {
			url += '?';
			if (options.pagination.limit) {
				url = `${url}limit=${options.pagination.limit}&`;
			}
			if (options.pagination.page) {
				url = `${url}page=${options.pagination.page}`;
			}
		}
		delete options.pagination;
		return this.axios.post<IResponse<T2>>(url, options);
	}

	private getById<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		const options = params.options as IOrmGetByIdOptions<T1>;
		return this.axios.post<IResponse<T2>>(this.preparePathWithId(params.path, options.id), options);
	}

	private create<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		return this.axios.post<IResponse<T2>>(params.path, params.options);
	}

	private update<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		const options = params.options as IOrmUpdateOptions<T1>;
		return this.axios.put<IResponse<T2>>(
			this.preparePathWithId(params.path, options.id),
			params.options
		);
	}

	private delete<T1, T2 = T1>(params: IOrmRequestParameter<T1>) {
		const options = params.options as IOrmDeleteOptions;
		return this.axios.delete<IResponse<T2>>(this.preparePathWithId(params.path, options.id), {
			data: params.options,
		});
	}
}

export default CubekitOrmClient;
