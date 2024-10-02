import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { IContainerType } from "@/components/shared/types/types";

export interface ISchemaContainer {
	id: string;
	guid: string;
	type: IContainerType;
	version: string;
	style: Record<string, unknown>;
	settings: ISchemaSettings;
	components: Array<{
		id: string;
		data: IComponentBaseFullSchema;
	}>;
}
