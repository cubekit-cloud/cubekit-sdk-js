import IStorageFile from './IStorageFile';
import IStorageResponse from './IStorageResponse';

export default interface ICreateDirectoryResponse extends IStorageResponse {
	data: IStorageFile;
}
