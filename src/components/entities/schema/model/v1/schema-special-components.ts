import { v4 as uuidv4 } from "uuid";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import { getRandomImageSchema } from "@/components/entities/schema/schema-image-data";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";

/**
 * @todo Removed // @ts-ignore
 */

export const saint_laurent_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "saint_laurent",
		version: versionComponentBase.card.version,
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
