export const enum OperatorsEnum {
    EQUAL = '=',
    INEQUAL = '!=',
    LIKE = 'like',
    ILIKE = 'ilike',
    MORE = '>',
    MORE_OR_EQUAL = '>=',
    LESS = '<',
    LESS_OR_EQUAL = '<=',
}

export const enum FilterValueTypesEnum {
    POINTER = 'pointer',
    SCALAR = 'scalar',
}

export const enum FilterBooleansEnum {
    AND = 'and',
    OR = 'or',
}

export const enum FilterTypesEnum {
    GROUP = 'group',
    SINGLE = 'single',
}

export const enum JoinTypesEnum {
    LEFT = 'left',
    RIGHT = 'right',
    FULL = 'full',
    INNER = 'inner',
}

export const enum OrderDirectionsEnum {
    ASC = 'asc',
    DESC = 'DESC',
}

export const enum OrderNullPositionsEnum {
    FIRST = 'first',
    LAST = 'last',
}

export const enum ResponseTypeEnum {
    RESOURCE = 'resource',
    EXPORT = 'export',
}

export const enum FileExportTypesEnum {
    XLSX = 'xlsx',
    CSV = 'csv',
}

export const enum ExportEncodingTypesEnum {
    UTF_8 = 'utf-8',
    WINDOWS_1251 = 'windows-1251',
}

export const enum RequestMethodsEnum {
    SEARCH = 'search',
    GET_BY_ID = 'get_by_id',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}