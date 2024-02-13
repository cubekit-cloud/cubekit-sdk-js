import axios, { AxiosInstance } from 'axios';
import IClientConfig from '../interfaces/IClientConfig';
import IRequestParameter from '../interfaces/IRequestParameter';
import {
	IResponse,
	IGetByIdOptions,
	ISearchOptions,
	IUpdateOptions,
	IDeleteOptions,
} from '../interfaces';
import { RequestMethodsEnum } from '../enums';

const ID_SPOT = '{key}';

class CubekitOrmClient {
	private axios: AxiosInstance;

	constructor(config: IClientConfig) {
		this.axios = axios.create({
			baseURL: config.baseUrl,
			withCredentials: true,
			headers: {
				['x-api-key']: config.serviceKey,
			},
		});
	};

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
	public send<T1, T2 = T1>(params: IRequestParameter<T1>) {
		switch (params.method) {
			case RequestMethodsEnum.GET_BY_ID:
				return this.getById<T1, T2>(params);
			case RequestMethodsEnum.CREATE:
				return this.create<T1, T2>(params);
			case RequestMethodsEnum.UPDATE:
				return this.update<T1, T2>(params);
			case RequestMethodsEnum.DELETE:
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
	};

	private search<T1, T2 = T1>(params: IRequestParameter<T1>) {
		let url = params.path;
		const options = params.options as ISearchOptions<T1>;
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
	};

	private getById<T1, T2 = T1>(params: IRequestParameter<T1>) {
		const options = params.options as IGetByIdOptions<T1>;
		return this.axios.post<IResponse<T2>>(this.preparePathWithId(params.path, options.id), options);
	};

	private create<T1, T2 = T1>(params: IRequestParameter<T1>) {
		return this.axios.post<IResponse<T2>>(params.path, params.options);
	};

	private update<T1, T2 = T1>(params: IRequestParameter<T1>) {
		const options = params.options as IUpdateOptions<T1>;
		return this.axios.put<IResponse<T2>>(
			this.preparePathWithId(params.path, options.id),
			params.options
		);
	};

	private delete<T1, T2 = T1>(params: IRequestParameter<T1>) {
		const options = params.options as IDeleteOptions;
		return this.axios.delete<IResponse<T2>>(this.preparePathWithId(params.path, options.id), {
			data: params.options,
		});
	};
}

export default CubekitOrmClient;
