import { OrderDirectionsEnum, OrderNullPositionsEnum } from "../enums";
export default interface IOrderParameter<T> {
    column?: keyof T;
    direction?: OrderDirectionsEnum;
    null_position?: OrderNullPositionsEnum;
}
//# sourceMappingURL=IOrderParameter.d.ts.map