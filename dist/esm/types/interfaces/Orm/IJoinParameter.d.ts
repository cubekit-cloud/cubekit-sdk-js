import { JoinTypesEnum } from "../../enums";
import IWhereParameter from "./IWhereParameter";
import IJoinOnParameter from "./IJoinOnParameter";
export default interface IJoinParameter<T> {
    type?: JoinTypesEnum;
    table?: string;
    on?: IJoinOnParameter[];
    where?: IWhereParameter<T>[];
}
//# sourceMappingURL=IJoinParameter.d.ts.map