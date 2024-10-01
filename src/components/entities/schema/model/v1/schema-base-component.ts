import { v4 as uuidv4 } from "uuid";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import { getRandomImageSchema } from "@/components/entities/schema/schema-image-data";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";

/**
 * @todo Removed // @ts-ignore
 */

export const card_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "card",
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

export const card_outside_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "card_outside",
		version: versionComponentBase.card.version,
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

export const album_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "album",
		version: versionComponentBase.card.version,
		style: {
			...defaultStyles.COMPONENTS.album,
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

export const album_outside_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "album_outside",
		version: versionComponentBase.card.version,
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

export const video_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "video",
		version: versionComponentBase.card.version,
		style: {
			...defaultStyles.COMPONENTS.video,
		},
		elements: [],
		content: {
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

export const video_outside_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "video_outside",
		version: versionComponentBase.card.version,
		style: {
			...defaultStyles.COMPONENTS.video_outside,
		},
		elements: [],
		content: {
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
