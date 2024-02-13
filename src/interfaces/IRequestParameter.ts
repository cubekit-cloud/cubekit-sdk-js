import { RequestMethodsEnum } from '../enums';
import ICreateOptions from './ICreateOptions';
import IDeleteOptions from './IDeleteOptions';
import IGetByIdOptions from './IGetByIdOptions';
import ISearchOptions from './ISearchOptions';
import IUpdateOptions from './IUpdateOptions';

export default interface IRequestParameter<T> {
	path: string;
	method: RequestMethodsEnum;
	options:
		| ISearchOptions<T>
		| IGetByIdOptions<T>
		| ICreateOptions<T>
		| IUpdateOptions<T>
		| IDeleteOptions;
}
