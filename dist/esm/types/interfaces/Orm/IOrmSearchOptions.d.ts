import { ResponseTypeEnum } from "../../enums";
import IExportParameters from "./IExportParameters";
import IWhereParameter from "./IWhereParameter";
import IJoinParameter from "./IJoinParameter";
import IOrderParameter from "./IOrderParameter";
import IPaginations from "./IPaginations";
import IRelationships from "./IRelationships";
import ISelectParameter from "./ISelectParameter";
export default interface IOrmSearchOptions<T> {
    pagination?: IPaginations;
    select?: ISelectParameter<T>[];
    where?: IWhereParameter<T>[];
    join?: IJoinParameter<T>[];
    order?: IOrderParameter<T>[];
    group_by?: Array<keyof T>;
    return?: ResponseTypeEnum;
    export?: IExportParameters<T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
}
//# sourceMappingURL=IOrmSearchOptions.d.ts.map