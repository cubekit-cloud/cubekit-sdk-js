import { RequestOrmMethodsEnum } from '../../enums';
import IOrmCreateOptions from './IOrmCreateOptions';
import IOrmDeleteOptions from './IOrmDeleteOptions';
import IOrmGetByIdOptions from './IOrmGetByIdOptions';
import IOrmSearchOptions from './IOrmSearchOptions';
import IOrmUpdateOptions from './IOrmUpdateOptions';
export default interface IOrmRequestParameter<T> {
    path: string;
    method: RequestOrmMethodsEnum;
    options: IOrmSearchOptions<T> | IOrmGetByIdOptions<T> | IOrmCreateOptions<T> | IOrmUpdateOptions<T> | IOrmDeleteOptions;
}
//# sourceMappingURL=IOrmRequestParameter.d.ts.map