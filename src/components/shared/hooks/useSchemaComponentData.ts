import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import {
	album_component_schema,
	album_outside_component_schema,
	card_component_schema,
	card_outside_component_schema,
	video_component_schema,
	video_outside_component_schema,
} from "@/components/app/schema/model/v1/schema-base-component";
import { saint_laurent_component_schema } from "@/components/app/schema/model/v1/schema-special-components";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
export default function useSchemaComponentData(): (
	type: ComponentBaseTypes | ComponentSpecialTypes,
	version: string
) => ISchemaComponent {
	return (type: ComponentBaseTypes, version: string): ISchemaComponent => {
		const schemaMap: Record<
			ComponentBaseTypes | ComponentSpecialTypes,
			ISchemaComponent
		> = {
			card: card_component_schema(version),
			card_outside: card_outside_component_schema(version),
			album: album_component_schema(version),
			album_outside: album_outside_component_schema(version),
			video: video_component_schema(version),
			video_outside: video_outside_component_schema(version),
			saint_laurent: saint_laurent_component_schema(version),
		};

		return schemaMap[type];
	};
}
