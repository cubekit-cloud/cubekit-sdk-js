import { IProcessPayload } from './IProcessPayload';
import { IProcessAction } from './IProcessAction';
import { IStepLink } from './IStepLink';

export interface IProcessHistory {
	type: string;
	timestamp: Date;
	step: IStepLink;
	action: IProcessAction;
	status: null | string;
	user_id: null | string;
	payload: IProcessPayload;
	errors: any[];
	transition_id: null | string;
	from_step: IStepLink;
	to_step: IStepLink;
}
