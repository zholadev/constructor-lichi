export interface IGetApiParams {
	data: any;
	errorFields: [];
	success: boolean;
	messages: string;
	totalData: any;
}

interface IHpMeta {
	page_type: string;
}

export interface IActiveCountry {
	id: string;
	name: string;
}

interface IHpUser {
	id: number;
	name: string;
	post: string;
	url: string;
}

export interface ISchemaListItem {
	hp_id: number;
	hp_guid: string;
	hp_name: string;
	hp_checksum: string;
	hp_user_id: number;
	hp_created: string;
	hp_meta: IHpMeta;
	hp_active: IActiveCountry[];
	hp_user: IHpUser;
}

export interface ISchemaListPagination {
	total: number;
	page: number;
	max_page: number;
	limit: number;
}

export interface ISchemaListData {
	data: ISchemaListItem[];
	pagination: ISchemaListPagination;
}

export interface IShopsListDataItem {
	id: string;
	name: string;
}

export interface ILangListDataItem {
	id: string;
	name: string;
	is_active: number;
}
