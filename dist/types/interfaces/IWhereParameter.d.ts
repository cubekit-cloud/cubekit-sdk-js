import { FilterBooleansEnum, OperatorsEnum, FilterTypesEnum, FilterValueTypesEnum } from '../enums';
export default interface IWhereParameter<T> {
    column: keyof T;
    operator: OperatorsEnum;
    value: string;
    value_type: FilterValueTypesEnum;
    boolean: FilterBooleansEnum;
    type: FilterTypesEnum;
    group?: IWhereParameter<T>;
}
//# sourceMappingURL=IWhereParameter.d.ts.map