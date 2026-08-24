import type { AxiosInstance } from 'axios';
import type { ItemSchema } from './parseResponse';

export type { ItemSchema };

export type WhereClause = {
	column: string;
	value?: string | number | boolean | null;
	operator?: string;
	boolean?: 'and' | 'or';
	type?: string;
	group?: WhereClause[];
	value_type?: string;
};

export type OrderClause = {
	column: string;
	direction?: 'asc' | 'desc';
	null_position?: 'first' | 'last';
};

export type SelectClause = {
	column: string;
	aggregation?: string;
	alias?: string;
};

export type JoinOnClause = {
	column?: string;
	left?: string;
	operator?: string;
	value?: string | number | boolean;
	right?: string;
};

export type JoinClause = {
	table?: string;
	type?: string;
	on?: JoinOnClause[];
	where?: WhereClause[];
};

/** POST …/search body (IndexRequest wire, snake_case). Sparse: omit unused keys. */
export type IndexRequestBody = {
	select?: SelectClause[];
	where?: WhereClause[];
	join?: JoinClause[];
	order?: OrderClause[];
	group_by?: string[];
	relationships?: Record<string, unknown>;
	return?: string | Record<string, unknown>;
	debug?: boolean;
};

export type PageParams = {
	page: number;
	limit: number;
};

export type SearchResult<T> = {
	items: T[];
	total: number;
	page: PageParams;
};

export type StoreBody = {
	data: { fields: Record<string, unknown>; relationships?: Record<string, unknown> };
	select?: SelectClause[];
	relationships?: Record<string, unknown>;
	debug?: boolean;
};

export type UpdateBody = StoreBody;

export type CrudMethod = 'SEARCH' | 'SHOW' | 'STORE' | 'PATCH' | 'PUT' | 'DESTROY';

export type FormatClientAuth =
	| { type: 'apiKey'; value: string }
	| { type: 'cookie' };

export type FormatClientConfig = {
	http?: AxiosInstance;
	baseURL?: string;
	/** @deprecated use baseURL */
	baseUrl?: string;
	apiPrefix?: string;
	headers?: Record<string, string>;
	withCredentials?: boolean;
	/** x-api-key when not using inject http. */
	serviceKey?: string;
	auth?: FormatClientAuth;
};

/** @deprecated use FormatClientConfig */
export type CrudClientConfig = FormatClientConfig;

export type ResourceRef = {
	resource?: string;
	/** Full collection path; ignores apiPrefix+resource when set. */
	path?: string;
};
