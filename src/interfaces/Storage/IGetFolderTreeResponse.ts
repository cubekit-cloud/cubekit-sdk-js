import IFolderInTree from './IFolderInTree';
import IStorageResponse from './IStorageResponse';

export default interface IGetFolderTreeResponse extends IStorageResponse {
	data: IFolderInTree[];
}
