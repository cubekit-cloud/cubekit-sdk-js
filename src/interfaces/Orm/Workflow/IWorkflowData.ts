import { IActionGroup } from "../IActionGroup";
import { IProcessHistory } from "../IProcessHistory";
import { IWorkflowDefinition } from "./IWorkflowDefinition";

export interface IWorkflowData {
	definition: IWorkflowDefinition;
	current_step_id: string;
	steps: Record<string, WorkflowStep>;
	history: IProcessHistory[];
	status: string;
	build_meta: BuildMeta;
	document: DocumentData;
	document_meta: DocumentMeta;
}

interface BuildMeta {
	synced_at: string | null;
}

interface DocumentData {
	id: string;
	name: string;
	price: number | null;
	file: any | null;
	description: string | null;
	created_at: string;
	updated_at: string | null;
	deleted_at: string | null;
	status: any | null;
	meta: any | null;
}

interface DocumentMeta {
	snapshot_at: string;
	source: 'orm_http' | string;
}

interface WorkflowStep {
	id: string;
	name: string;
	order: number;
	auto_approve: boolean;
	is_skippable_on_retry: boolean;
	validations: any[];
	actions: Record<string, WorkflowAction>;
	transitions: Record<string, Transition>;
	action_groups: IActionGroup[];
}

interface WorkflowAction {
	build: ActionBuild;
	state: ActionState;
}

interface ActionBuild {
	id: string;
	name: string;
	label: string;
	action_type: string;
	assignee_type: string;
	workflow_action_group_id: string;
	assignee_value: string[];
	condition_expression: ConditionExpression | any[];
	appearance_expression: any[];
	callback_timeout_minutes: number | null;
}

interface ConditionExpression {
	[field: string]: string[];
}

interface ActionState {
	status: string;
	result: any | null;
	timestamp: string | null;
	user_id: string | null;
	payload: any[];
	errors: any[];
}

interface Transition {
	id: string;
	action_id: string;
	from_step_id: string;
	to_step_id: string;
	is_default: boolean;
	condition_expression: any | null;
}
