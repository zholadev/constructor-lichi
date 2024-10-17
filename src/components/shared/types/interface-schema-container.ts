import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";
import {
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

export interface ISchemaContainer {
	id: string;
	guid: string;
	type: IContainerType;
	version: string;
	display: DisplayContainerType;
	style: Record<string, unknown>;
	settings: ISchemaSettings;
	components: Array<
		{
			id: string;
		} & ISchemaComponent
	>;
}

export interface ISchemaBaseContainer {
	id: string;
	guid: string;
	type: IContainerType;
	version: string;
	display: DisplayContainerType;
	style: Record<string, unknown>;
	settings: ISchemaSettings;
}
