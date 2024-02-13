import { JoinTypesEnum } from "../enums";
import { IFilterParameter } from "./IWhereParameter";
import IJoinOnParameter from "./IJoinOnParameter";

export default interface IJoinParameter<T> {
    type?: JoinTypesEnum;
    table?: string;
    on?: IJoinOnParameter[];
    where?: IFilterParameter<T>[];
}