import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import { IElementTotal } from "@/components/features/app/ui/elements/types/interface-elements";
import { ISchemaContent } from "@/components/shared/types/interface-schema-content";
import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";

export interface IComponentBaseFullSchema {
	id: string;
	type: ComponentBaseTypes | ComponentSpecialTypes;
	version: string;
	style: Record<string, unknown>;
	elements: IElementTotal[];
	content: ISchemaContent;
	settings: ISchemaSettings;
}
export interface IComponentCardSchema extends IComponentBaseFullSchema {}

export interface IComponentCardVideoSchema extends IComponentBaseFullSchema {}

export type IComponentTotalDataSchema =
	| IComponentCardSchema
	| IComponentCardVideoSchema;
