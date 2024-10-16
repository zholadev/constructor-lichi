import { SchemaComponentTypes } from "@/components/shared/types/types-components";
import {
	album_component_schema,
	album_outside_component_schema,
	card_component_schema,
	card_outside_component_schema,
} from "@/components/app/schema/model/v1/schema-base-component";
import { saint_laurent_component_schema } from "@/components/app/schema/model/v1/schema-special-components";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

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
	type: SchemaComponentTypes,
	version: string
) => ISchemaComponent {
	const toastMessage = useToastMessage();

	const schemaMap: Partial<
		Record<SchemaComponentTypes, (version: string) => ISchemaComponent>
	> = {
		card: card_component_schema,
		card_outside: card_outside_component_schema,
		album: album_component_schema,
		album_outside: album_outside_component_schema,
		saint_laurent: saint_laurent_component_schema,
	};

	return (type: SchemaComponentTypes, version: string): ISchemaComponent => {
		const schemaFunc = schemaMap[type];

		if (!schemaFunc) {
			toastMessage(`Схема для типа "${type}" не найдена.`, "error");
			throw new Error(`Схема для типа "${type}" не найдена.`);
		}

		return schemaFunc(version);
	};
}
