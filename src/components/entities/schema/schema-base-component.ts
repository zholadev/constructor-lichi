import { v4 as uuidv4 } from "uuid";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import { getRandomImageSchema } from "@/components/entities/schema/schema-image-data";
import { IComponentBaseFullSchema } from "@/components/features/app/blocks/types/interface-components";

export const card_component_schema = (): IComponentBaseFullSchema => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "card",
		version: versionComponentBase.card.version,
		style: {},
		elements: [],
		content: {
			photo: getRandomImageSchema(),
		},
		settings: {
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
		style: {},
		elements: [],
		content: {
			photo: getRandomImageSchema(),
		},
		settings: {
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
		style: {},
		elements: [],
		content: {
			photo: getRandomImageSchema("album"),
		},
		settings: {
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
		style: {},
		elements: [],
		content: {
			photo: getRandomImageSchema("album"),
		},
		settings: {
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
		style: {},
		elements: [],
		content: {
			video: {
				videoSrc: "",
				poster: getRandomImageSchema("card", true),
			},
		},
		settings: {
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
		type: "video",
		version: versionComponentBase.card.version,
		style: {},
		elements: [],
		content: {
			video: {
				videoSrc: "",
				poster: getRandomImageSchema("card", true),
			},
		},
		settings: {
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
