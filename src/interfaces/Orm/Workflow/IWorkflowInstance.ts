import { IWorkflowData } from './IWorkflowData';
import { IWorkflowDocumentInfo } from './IWorkflowDocumentInfo';
import { IWorkflowInstanceMeta } from './IWorkflowInstanceMeta';

export interface IWorkflowInstance {
	id: string;
	workflow_definition_id: string;
	meta: IWorkflowInstanceMeta;
	document: IWorkflowDocumentInfo;
	status: string;
	current_step_id: string;
	initiator_id: string;
	initiated_at: string;
	data: IWorkflowData;
	updated_at: string;
	created_at: string;
}
