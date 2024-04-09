import IStorageFile from './IStorageFile';
import IStorageResponse from './IStorageResponse';

export default interface IViewResponse extends IStorageResponse {
	data: IStorageFile[];
}
