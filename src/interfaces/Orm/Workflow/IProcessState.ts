import IActionGroup from './IActionGroup';
import IStepLink from './IStepLink';
import IProcessHistory from './IProcessHistory';
import IStep from './IStep';
import IWorkflowDefinition from './IWorkflowDefinition';
import IWorkflowInstance from './IWorkflowInstance';

export default interface IProcessState {
	workflow_instance: Pick<
		IWorkflowInstance,
		'id' | 'status' | 'workflow_definition_id' | 'initiator_id' | 'initiated_at' | 'current_step_id'
	>;
	definition: Pick<IWorkflowDefinition, 'id' | 'code' | 'name'>;
	current_step: IStepLink;
	step_actions: IStep[];
	allowed_actions: Pick<
		IStep,
		| 'id'
		| 'label'
		| 'name'
		| 'action_type'
		| 'assignee_value'
		| 'assignee_type'
		| 'workflow_action_group_id'
	>[];
	action_groups: IActionGroup[];
	history: IProcessHistory[];
}
