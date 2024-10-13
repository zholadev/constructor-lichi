import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

export type WidgetTypes = "stories" | "none";

export interface IWidgetList {
	id: number;
	type: WidgetTypes;
	name: string;
}

export interface ISchemaWidgetData {
	type: WidgetTypes;
	data: {
		components?: ISchemaComponent[];
	};
}
