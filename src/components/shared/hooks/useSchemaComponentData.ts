import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import { IComponentBaseFullSchema } from "@/components/features/app/blocks/types/interface-components";
import {
	album_component_schema,
	album_outside_component_schema,
	card_component_schema,
	card_outside_component_schema,
	video_component_schema,
	video_outside_component_schema,
} from "@/components/entities/schema/schema-base-component";

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
export default function useSchemaComponentData(): IComponentBaseFullSchema {
	return function (type: ComponentBaseTypes): IComponentBaseFullSchema {
		const schemaMap: Record<ComponentBaseTypes, IComponentBaseFullSchema> =
			{
				card: card_component_schema(),
				card_outside: card_outside_component_schema(),
				album: album_component_schema(),
				album_outside: album_outside_component_schema(),
				video: video_component_schema(),
				video_outside: video_outside_component_schema(),
			};

		return schemaMap[type];
	};
}
