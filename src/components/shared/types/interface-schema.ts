import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { BottomBarTypes, TemplateType } from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaElements } from "@/components/features/app/modules/elements/types/v1/interface-elements";

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

export interface IBottomBarType {
	id: number;
	name: string;
	value: BottomBarTypes;
}

export interface ISchemaPageData {
	active: [];
	guid: string;
	id: number;
	meta: Record<string, unknown>;
	name: string;
}

export type ISchemaActiveData =
	| ISchemaContainer
	| ISchemaComponent
	| ISchemaElements;
