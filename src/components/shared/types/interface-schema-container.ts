import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";
import {
	ContainerBlockType,
	IContainerType,
} from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

export interface ISchemaContainer {
	id: string;
	guid: string;
	type: IContainerType;
	version: string;
	block: ContainerBlockType;
	style: Record<string, unknown>;
	settings: ISchemaSettings;
	components: Array<
		{
			id: string;
		} & ISchemaComponent
	>;
}

export type ISchemaContainerComponentWrapper = Array<{
	id: string;
	data: ISchemaComponent;
}>;
