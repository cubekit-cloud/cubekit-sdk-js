import axios, {
	AxiosInstance,
	AxiosProgressEvent,
	GenericAbortSignal,
	InternalAxiosRequestConfig,
} from 'axios';
import { IStorageClientConfig, IUploadFileResponse } from '../interfaces/Storage';
import IGetFolderTreeResponse from '../interfaces/Storage/IGetFolderTreeResponse';
import ICreateDirectoryResponse from '../interfaces/Storage/ICreateDirectoryResponse';
import IViewResponse from '../interfaces/Storage/IViewResponse';
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
class CubekitStorageClient {
	private axios: AxiosInstance;

	constructor(config: IStorageClientConfig) {
		this.axios = axios.create({
			baseURL: config.baseUrl,
			withCredentials: true,
			headers: {
				['x-api-key']: config.serviceKey,
			},
		});
	}

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
	public setConfig(config: IStorageClientConfig) {
		this.axios.defaults.baseURL = config.baseUrl;
		this.axios.defaults.headers['x-api-key'] = config.serviceKey;
	}

	/**
	 * Set authorization header
	 * @method CubekitStorageClient.setAuthorizationHeader
	 * @param {string} value - a string with auth data
	 * @example
	 *
	 *storageClient.setAuthorizationHeader('Basic YWxhZGRpbjpvcGVuc2VzYW1l');
	 */
	public setAuthorizationHeader(value: string) {
		this.axios.defaults.headers['Authorization'] = value;
	}

	/**
	 * Get folder tree
	 * @method CubekitStorageClient.getFolderTree
	 * @example
	 *
	 *storageClient.getFolderTree();
	 */
	public getFolderTree(path?: string) {
		return this.axios
			.get<IGetFolderTreeResponse>(`/tree?path=${encodeURIComponent(path ? path : '/')}`)
			.then((response) => response.data.data);
	}

	/**
	 * Get avaliable folders and files
	 * @method CubekitStorageClient.view
	 * @example
	 *
	 *storageClient.view();
	 */
	public view(path?: string) {
		return this.axios
			.get<IViewResponse>(`/view?path=${encodeURIComponent(path ? path : '/')}`)
			.then((response) => response.data.data);
	}

	/**
	 * Create directory
	 * @method CubekitStorageClient.createDirectory
	 * @example
	 *
	 *storageClient.createDirectory();
	 */
	public createDirectory(path: string) {
		return this.axios
			.post<ICreateDirectoryResponse>(`/createDirectory?path=${encodeURIComponent(path)}`)
			.then((response) => {
				return response.data;
			});
	}

	/**
	 * Delete directory or file
	 * @method CubekitStorageClient.delete
	 * @example
	 *
	 *storageClient.delete();
	 */
	public delete(paths: string[]) {
		return this.axios.delete(`/delete`, { data: paths }).then((response) => {
			return response.data;
		});
	}

	/**
	 * Upload file (with a require file name)
	 * @method CubekitStorageClient.upload
	 * @example
	 *
	 *storageClient.upload();
	 */
	public upload(
		path: string,
		file: File,
		fileName: string,
		onUploadProgress?: (progressEvent: AxiosProgressEvent) => void,
		signal?: GenericAbortSignal
	) {
		const formData = new FormData();
		formData.append('upload_file', file);

		return this.axios
			.post<IUploadFileResponse>(
				`/upload?path=${encodeURIComponent(path)}&file_name=${fileName}`,
				formData,
				{
					onUploadProgress,
					signal,
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			)
			.then((response) => {
				return response.data;
			});
	}

	/**
	 * Resend request
	 * @method CubekitStorageClient.resend
	 * @example
	 *
	 *storageClient.resend();
	 */
	public resend(config: InternalAxiosRequestConfig) {
		return this.axios.request(config).then((response) => {
			return response.data;
		});
	}

	/**
	 * Simple upload file (without file name)
	 * @method CubekitStorageClient.simpleUpload
	 * @example
	 *
	 *storageClient.simpleUpload();
	 */
	public simpleUpload(
		path: string,
		file: File,
		onUploadProgress: ((progressEvent: AxiosProgressEvent) => void) | undefined,
		signal?: GenericAbortSignal
	) {
		const formData = new FormData();
		formData.append('upload_file', file);

		return this.axios
			.post<IUploadFileResponse>(`/simpleUpload?path=${encodeURIComponent(path)}`, formData, {
				onUploadProgress,
				signal,
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then((response) => {
				return response.data;
			});
	}

	/**
	 * Move directory or file
	 * @method CubekitStorageClient.move
	 * @example
	 *
	 *storageClient.move();
	 */
	public move(source: string, target: string) {
		return this.axios
			.post<IMoveResponse>(
				`/move?source=${encodeURIComponent(source)}&target=${encodeURIComponent(target)}`
			)
			.then((response) => {
				return response.data;
			});
	}
}

export default CubekitStorageClient;
