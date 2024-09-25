import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";
import {
	ISchemaContent,
	ISchemaContentPhoto,
	ISchemaContentVideo,
} from "@/components/shared/types/interface-schema-content";
import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";

export interface IComponentBaseSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: IElementTotal[];
}
export interface IComponentBaseFullSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: IElementTotal[];
	content: ISchemaContent;
	settings: ISchemaSettings;
}
export interface IComponentCardSchema extends IComponentBaseSchema {
	content: ISchemaContentPhoto;
}

export interface IComponentCardVideoSchema extends IComponentBaseSchema {
	content: ISchemaContentVideo;
}

export type IComponentTotalDataSchema =
	| IComponentCardSchema
	| IComponentCardVideoSchema;
