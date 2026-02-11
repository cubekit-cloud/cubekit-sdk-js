export default interface IProcessAction {
	id: string;
	name: string;
	label: string;
	action_type: string;
	assignee_type: 'user' | 'expression';
	assignee_value: string[] | { [key: string]: any };
}
