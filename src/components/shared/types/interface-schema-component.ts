import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { ISchemaContent } from "@/components/shared/types/interface-schema-content";
import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";
import { ISchemaWidgetData } from "@/components/features/app/modules/widgets/types/interface-widget";

export interface ISchemaComponent {
	id: string;
	guid: string;
	type: ComponentBaseTypes | ComponentSpecialTypes;
	version: string;
	style: Record<string, unknown>;
	elements: IElementTotal[];
	content?: ISchemaContent;
	settings?: ISchemaSettings;
	widgets?: ISchemaWidgetData;
}
