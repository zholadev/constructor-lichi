import { ISchemaContentMediaType } from "@/components/shared/types/interface-schema-content";

export interface ISchemaSettingsView {
	heightFull: boolean;
	navbarMode: boolean;
	contentType: ISchemaContentMediaType;
}

export type SchemaShowSiteType = "base" | "retail" | "all";

export interface IShowSiteType {
	id: number;
	value: SchemaShowSiteType;
	name: string;
}

export interface ISchemaSettingsShow {
	siteType: SchemaShowSiteType;
}

export interface ISchemaSettings {
	view: ISchemaSettingsView;
	show: SchemaShowSiteType;
}
