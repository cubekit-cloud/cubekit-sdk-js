import IStorageFile from './IStorageFile';
import IStorageResponse from './IStorageResponse';

export default interface IMoveResponse extends IStorageResponse {
	data: IStorageFile;
}
