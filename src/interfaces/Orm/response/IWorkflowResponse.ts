import { IWorkflowInstance } from '../Workflow/IWorkflowInstance';

export default interface IWorkflowResponse {
	status: string;
	instance: IWorkflowInstance;
}
