import { SchemaElementTypes } from "@/components/shared/types/types-components";
import {
	ISchemaContentLinkHrefParams,
	ISchemaContentText,
} from "@/components/shared/types/interface-schema-content";
import {
	ISchemaSettingsTimer,
	ISchemaSettingsView,
} from "@/components/shared/types/interface-schema-settings";

export interface ISchemaElement {
	id: string;
	guid: string;
	type: SchemaElementTypes;
	style: Record<string, unknown>;
	version: string;
}

export interface IElementSchema {
	id: string;
	guid: string;
	type: SchemaElementTypes;
	style: Record<string, unknown>;
	version: string;
	settings?: {
		view: ISchemaSettingsView;
		timer?: ISchemaSettingsTimer;
	};
	content: {
		title?: ISchemaContentText;
		link?: ISchemaContentLinkHrefParams;
	};
}

export interface ISchemaButtonElement extends ISchemaElement {
	content?: {
		title: ISchemaContentText;
		link?: ISchemaContentLinkHrefParams;
	};
	settings?: {
		view: ISchemaSettingsView;
	};
}

export interface ISchemaTextElement extends ISchemaElement {
	content?: {
		title: ISchemaContentText;
	};
	settings?: {
		view: ISchemaSettingsView;
	};
}

export interface ISchemaTimerElement extends ISchemaElement {
	settings: {
		timer: ISchemaSettingsTimer;
		view: ISchemaSettingsView;
	};
}
export type ISchemaElements = IElementSchema;
export type ISchemaElementInterfaces =
	| ISchemaButtonElement
	| ISchemaTextElement
	| ISchemaTimerElement;
