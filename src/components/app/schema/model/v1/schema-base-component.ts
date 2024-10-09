import { v4 as uuidv4 } from "uuid";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";
import { getRandomImageSchema } from "@/components/app/schema/schema-image-data";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

/**
 * @todo Removed // @ts-ignore
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
			// @ts-ignore
			photo: getRandomImageSchema("album"),
		},
		settings: {
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
			// @ts-ignore
			photo: getRandomImageSchema("album"),
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

export const video_component_schema = (version: string): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "video",
		version,
		style: {
			...defaultStyles.COMPONENTS.video,
		},
		elements: [],
		content: {
			// @ts-ignore
			photo: getRandomImageSchema(),
			video: {
				videoSrc: "",
				// @ts-ignore
				poster: getRandomImageSchema("card", true),
			},
		},
		settings: {
			// @ts-ignore
			view: {
				contentType: "video",
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

export const video_outside_component_schema = (
	version: string
): ISchemaComponent => {
	return {
		guid: uuidv4(),
		type: "video_outside",
		version,
		style: {
			...defaultStyles.COMPONENTS.video_outside,
		},
		elements: [],
		content: {
			// @ts-ignore
			photo: getRandomImageSchema(),
			video: {
				videoSrc: "",
				// @ts-ignore
				poster: getRandomImageSchema("card", true),
			},
		},
		settings: {
			// @ts-ignore
			view: {
				contentType: "video",
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
