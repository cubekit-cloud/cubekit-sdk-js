import { AggregationsEnum } from '../../enums';

export default interface ISelectParameter<T> {
	column?: keyof T;
	aggregation?: AggregationsEnum;
	alias?: string;
}
