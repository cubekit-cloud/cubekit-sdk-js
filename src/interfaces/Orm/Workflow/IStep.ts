export interface IStep {
	id: string;
	name: string;
	label: string;
	action_type: string;
	assignee_type: string;
	status: string;
	timestamp: null;
	user_id: null;
	payload: any[];
	errors: any[];
	workflow_action_group_id: string;
}
