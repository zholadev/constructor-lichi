import { v4 as uuidv4 } from "uuid";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";
import { getRandomImageSchema } from "@/components/app/schema/schema-image-data";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

/**
 * @todo Removed ts-ignore
 */

export const card_component_schema = (version: string): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "card",
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
					gap: 0,
					flexDirection: "column",
				},
			},
		},
	};
};

export const card_outside_component_schema = (
	version: string
): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "card_outside",
		version,
		style: {
			...defaultStyles.COMPONENTS.card_outside,
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
					gap: 0,
					flexDirection: "column",
				},
			},
		},
	};
};

export const album_component_schema = (version: string): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "album",
		version,
		style: {
			...defaultStyles.COMPONENTS.album,
		},
		elements: [],
		content: {
			photo: getRandomImageSchema("album"),
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
					gap: 0,
					flexDirection: "column",
				},
			},
		},
	};
};

export const album_outside_component_schema = (
	version: string
): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "album_outside",
		version,
		style: {
			...defaultStyles.COMPONENTS.album_outside,
		},
		elements: [],
		content: {
			photo: getRandomImageSchema("album"),
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
					gap: 0,
					flexDirection: "column",
				},
			},
		},
	};
};
