export enum RelationsModesEnum {
    SYNC = 'sync',
    ATTACH = 'attach',
    DETACH = 'detach',
}

export enum AggregationsEnum {
    COUNT = 'count',
    SUM = 'sum',
    AVG = 'avg',
    MIN = 'min',
    MAX = 'max',
}

export enum OperatorsEnum {
    EQUAL = '=',
    INEQUAL = '!=',
    LIKE = 'like',
    ILIKE = 'ilike',
    MORE = '>',
    MORE_OR_EQUAL = '>=',
    LESS = '<',
    LESS_OR_EQUAL = '<=',
}

export enum FilterValueTypesEnum {
    POINTER = 'pointer',
    SCALAR = 'scalar',
}

export enum FilterBooleansEnum {
    AND = 'and',
    OR = 'or',
}

export enum FilterTypesEnum {
    GROUP = 'group',
    SINGLE = 'single',
}

export enum JoinTypesEnum {
    LEFT = 'left',
    RIGHT = 'right',
    FULL = 'full',
    INNER = 'inner',
}

export enum OrderDirectionsEnum {
    ASC = 'asc',
    DESC = 'desc',
}

export enum OrderNullPositionsEnum {
    FIRST = 'first',
    LAST = 'last',
}

export enum ResponseTypeEnum {
    RESOURCE = 'resource',
    EXPORT = 'export',
}

export enum FileExportTypesEnum {
    XLSX = 'xlsx',
    CSV = 'csv',
}

export enum ExportEncodingTypesEnum {
    UTF_8 = 'utf-8',
    WINDOWS_1251 = 'windows-1251',
}

export enum RequestOrmMethodsEnum {
    SEARCH = 'search',
    GET_BY_ID = 'get_by_id',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}