import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { TemplateType } from "@/components/shared/types/types";

export interface ISchemaTotalData {
	desktop: ISchemaContainer[] | [];
	tablet: ISchemaContainer[] | [];
	mobile: ISchemaContainer[] | [];
}

export interface ISchemaPageType {
	id: number;
	name: string;
	value: TemplateType;
}

export interface ISchemaPageData {
	active: [];
	guid: string;
	id: number;
	meta: Record<string, unknown>;
	name: string;
}
