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
	| "tag"
	| "none";

export interface ISchemaContentPhotoData {
	url: string;
	size?: number;
	created?: number;
	extension?: string;
	info?: {
		width: number;
		height: number;
		luminance: number;
	};
	name?: string;
	path?: string;
	public_url?: string;
}

export type LinkTargetType = "_blank" | "_parent" | "_self" | "_top" | "none";
export type AnimationTypes = "zoom_out" | "zoom_in" | "none";

export interface ISchemaContentPhotoDesktopParams {
	desktop: ISchemaContentPhotoData;
}

export interface ISchemaContentPhotoTabletParams {
	tablet: ISchemaContentPhotoData;
}

export interface ISchemaContentPhotoMobileParams {
	mobile: ISchemaContentPhotoData;
}

export type ISchemaContentPhotoTripleTypes =
	| ISchemaContentPhotoDesktopParams
	| ISchemaContentPhotoTabletParams
	| ISchemaContentPhotoMobileParams;

export interface ISchemaContentPhotoTriple
	extends ISchemaContentPhotoDesktopParams,
		ISchemaContentPhotoTabletParams,
		ISchemaContentPhotoMobileParams {}

export interface ISchemaContentPhoto {
	photo: ISchemaContentPhotoTriple;
}

export interface ISchemaContentVideoParams {
	videoSrc: string;
	poster: ISchemaContentPhotoData;
}

export interface ISchemaContentVideo {
	video: {
		videoSrc: string;
		poster: ISchemaContentPhotoData;
	};
}

export type ISchemaContentTextParams = Record<string, Record<"value", string>>;

export interface ISchemaContentTextValue {
	[key: string]: { value: string };
}

export interface ISchemaContentText {
	title: ISchemaContentTextValue;
}

export interface ISchemaContentLinkHrefParams {
	href: {
		src: string;
		internal_src: string;
	};
}

export interface ISchemaAnimationParams {
	type: AnimationTypes;
	observer: boolean;
}

export interface ISchemaAnimationContent {
	animation: ISchemaAnimationParams;
}

export interface ISchemaContent {
	photo?: ISchemaContentPhotoTriple;
	video?: ISchemaContentVideoParams;
	title?: ISchemaContentTextValue;
	link?: ISchemaContentLinkHrefParams;
	animation?: ISchemaAnimationParams;
}
