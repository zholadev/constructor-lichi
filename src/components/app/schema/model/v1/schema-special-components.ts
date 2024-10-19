import { v4 as uuidv4 } from "uuid";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";
import { getRandomImageSchema } from "@/components/app/schema/schema-image-data";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

/**
 * @todo Removed
 */

export const saint_laurent_component_schema = (
	version: string
): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "saint_laurent",
		version,
		style: {
			...defaultStyles.COMPONENTS.card,
		},
		elements: [],
		content: {
			photo: getRandomImageSchema(),
		},
		settings: {
			view: {
				contentType: "image",
				darkTheme: true,
			},
			element: {
				style: {
					justifyContent: "flex-end",
					alignItems: "center",
					gap: 4,
					flexDirection: "column",
				},
			},
		},
	};
};
