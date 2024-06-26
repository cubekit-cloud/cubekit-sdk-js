import { OperatorsEnum } from "../../enums";

export default interface IJoinOnParameter {
    left?: string;
    operator?: OperatorsEnum;
    right?: string;
}