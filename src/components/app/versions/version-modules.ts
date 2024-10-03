import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";

export const versionTemplate = {
	version: "dev-1.0.0",
};

export const versionComponentBase: Record<
	ComponentBaseTypes,
	Record<"version", string>
> = {
	card: {
		version: "dev-1.0.0",
	},
	card_outside: {
		version: "dev-1.0.0",
	},
	album: {
		version: "dev-1.0.0",
	},
	album_outside: {
		version: "dev-1.0.0",
	},
	video: {
		version: "dev-1.0.0",
	},
	video_outside: {
		version: "dev-1.0.0",
	},
};

export const versionElementBase: Record<
	ElementBaseTypes,
	Record<"version", string>
> = {
	button: {
		version: "dev-1.0.0",
	},
	text: {
		version: "dev-1.0.0",
	},
	timer: {
		version: "dev-1.0.0",
	},
};
