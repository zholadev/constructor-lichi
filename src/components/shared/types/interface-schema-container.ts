import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";

export interface ISchemaContainer {
	id: string;
	guid: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
	settings: ISchemaSettings;
	components: Array<{
		id: string;
		data: IComponentBaseFullSchema;
	}>;
}

export interface ISchemaContainerComponents {

}
