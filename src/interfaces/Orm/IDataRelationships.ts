import { RelationsModesEnum } from "../../enums";

export default interface IDataRelationships {
    mode?: RelationsModesEnum;
    ids: string[];
}