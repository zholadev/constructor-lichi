import { ISchemaContentMediaType } from "@/components/shared/types/interface-schema-content";

export interface ISchemaSettingsView {
	heightFull: boolean;
	navbarMode: boolean;
	contentType: ISchemaContentMediaType;
}

export type SchemaShowSiteType = "base" | "retail" | "all";
export type SchemaSettingElementPositionX = "left" | "right" | "center";
export type SchemaSettingElementPositionY = "top" | "bottom" | "center";

export interface IShowSiteType {
	id: number;
	value: SchemaShowSiteType;
	name: string;
}

export interface ISchemaSettingsShow {
	siteType: SchemaShowSiteType;
}

export interface ISchemaSettingsTimer {
	targetDate: string | Date;
	targetTime: string | Date;
}

export interface ISchemaSettingsElement {
	positionX: SchemaSettingElementPositionX;
	positionY: SchemaSettingElementPositionY;
	style: {
		justifyContent: string;
		alignItems: string;
	};
}

export interface ISchemaSettings {
	view: ISchemaSettingsView;
	show: SchemaShowSiteType;
	element: ISchemaSettingsElement;
}
