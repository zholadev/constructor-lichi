import { IGalleryImageItem } from "@/components/shared/types/interface";

export type ISchemaContentMediaType = "video" | "image";

export type LinkRelType =
	| "alternate"
	| "author"
	| "bookmark"
	| "external"
	| "help"
	| "license"
	| "next"
	| "nofollow"
	| "noreferrer"
	| "noopener"
	| "prev"
	| "search"
	| "tag";

export type LinkTargetType = "_blank" | "_parent" | "_self" | "_top";
export type MotionTypes = "zoom_out" | "zoom_in" | "none";

export interface ISchemaContentPhoto {
	photo?: {
		desktop: IGalleryImageItem;
		tablet: IGalleryImageItem;
		mobile: IGalleryImageItem;
	};
}

export interface ISchemaContentVideo {
	video?: {
		videoSrc: string;
		poster: IGalleryImageItem;
	};
}

export interface ISchemaContentLink {
	link: {
		href: {
			src: string;
			internal_src: string;
		};
		settings?: {
			rel: LinkRelType;
			target: LinkTargetType;
		};
	};
}

export interface ISchemaAnimateParams {
	type: MotionTypes;
	observer: boolean;
}

export interface ISchemaMotionContent {
	animation?: ISchemaAnimateParams;
}

export interface ISchemaContentText {
	title: Record<string, Record<"value", string>>;
}

export interface ISchemaContent
	extends ISchemaContentPhoto,
		ISchemaContentVideo,
		ISchemaContentText,
		ISchemaContentLink,
		ISchemaMotionContent {}
