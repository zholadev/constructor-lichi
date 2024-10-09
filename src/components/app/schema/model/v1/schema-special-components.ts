import { v4 as uuidv4 } from "uuid";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";
import { getRandomImageSchema } from "@/components/app/schema/schema-image-data";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

/**
 * @todo Removed // @ts-ignore
 */

export const saint_laurent_component_schema = (
	version?: string
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
			// @ts-ignore
			photo: getRandomImageSchema(),
		},
		settings: {
			// @ts-ignore
			view: {
				contentType: "image",
				darkTheme: true,
			},
			element: {
				positionX: "center",
				positionY: "bottom",
				style: {
					justifyContent: "flex-end",
					alignItems: "center",
				},
			},
		},
	};
};
