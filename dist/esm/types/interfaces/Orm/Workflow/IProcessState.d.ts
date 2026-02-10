import { IActionGroup } from "./IActionGroup";
import { IStepLink } from './IStepLink';
import { IDefinition } from "./IDefinition";
import { IProcessHistory } from "./IProcessHistory";
import { IStep } from "./IStep";
import { IWorkflowInstance } from "./IWorkflowInstance";
export default interface IProcessState {
    workflow_instance: IWorkflowInstance;
    definition: IDefinition;
    current_step: IStepLink;
    step_actions: IStep[];
    allowed_actions: IStep[];
    action_groups: IActionGroup[];
    history: IProcessHistory[];
}
//# sourceMappingURL=IProcessState.d.ts.map