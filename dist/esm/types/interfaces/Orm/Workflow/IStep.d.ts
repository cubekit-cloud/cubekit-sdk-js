import { IActionState } from './IWorkflowData';
export default interface IStep {
    id: string;
    name: string;
    label: string;
    action_type: string;
    assignee_type: 'user' | 'expression';
    assignee_value: string[] | {
        [key: string]: any;
    };
    status: string;
    mode: string;
    timestamp: null;
    user_id: null;
    payload: any[];
    errors: any[];
    workflow_action_group_id: string;
    executions?: IActionState[];
}
//# sourceMappingURL=IStep.d.ts.map