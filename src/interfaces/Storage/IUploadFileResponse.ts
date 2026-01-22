import IStorageFile from './IStorageFile';
import IStorageResponse from './IStorageResponse';

export default interface IUploadFileResponse extends IStorageResponse {
	data: IStorageFile[];
}
