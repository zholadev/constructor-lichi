import { IComponentBaseSchema } from "@/components/shared/types/interface-components";
import { versionComponentBase } from "@/components/app/versions/version-modules";

import { v4 as uuidv4 } from "uuid";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import { IMAGES } from "@/components/shared/constants/images";

export const componentBaseData: Record<
	ComponentBaseTypes,
	IComponentBaseSchema
> = {
	card: {
		id: uuidv4(),
		type: "card",
		version: versionComponentBase.card.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	card_outside: {
		id: uuidv4(),
		type: "card_outside",
		version: versionComponentBase.card_outside.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	card_outside_left: {
		id: uuidv4(),
		type: "card_outside_left",
		version: versionComponentBase.card_outside_left.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	card_outside_right: {
		id: uuidv4(),
		type: "card_outside_right",
		version: versionComponentBase.card_outside_right.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	album: {
		id: uuidv4(),
		type: "album",
		version: versionComponentBase.album.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	album_outside: {
		id: uuidv4(),
		type: "album_outside",
		version: versionComponentBase.album_outside.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	video: {
		id: uuidv4(),
		type: "video",
		version: versionComponentBase.video.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
	video_outside: {
		id: uuidv4(),
		type: "video_outside",
		version: versionComponentBase.video_outside.version,
		style: {},
		elements: [],
		content: {
			photo: {
				thumbnail:
					IMAGES.THUMBNAIL.card[
						Math.floor(Math.random() * IMAGES.THUMBNAIL.card.length)
					],
			},
		},
	},
};
