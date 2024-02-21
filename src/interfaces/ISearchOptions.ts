import { ResponseTypeEnum } from "../enums";
import IExportParameters from "./IExportParameters";
import IWhereParameter from "./IWhereParameter";
import IJoinParameter from "./IJoinParameter";
import IOrderParameter from "./IOrderParameter";
import IPaginations from "./IPaginations";
import IRelationships from "./IRelationships";

export default interface ISearchOptions<T> {
    pagination?: IPaginations;
    select?: Array<keyof T | '*'>;
    where?: IWhereParameter<T>[];
    join?: IJoinParameter<T>[];
    order?: IOrderParameter<T>[];
    group_by?: Array<keyof T>;
    return?: ResponseTypeEnum;
    export?: IExportParameters<T>;
    debug?: boolean;
    relationships?: IRelationships<any>;
}