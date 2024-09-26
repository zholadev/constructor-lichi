import { IGalleryImageItem } from "@/components/shared/types/interface";
import {
	LinkRelType,
	LinkTargetType,
} from "@/components/shared/types/types-design";

export type ISchemaContentMediaType = "video" | "image";

export interface ISchemaContentPhoto {
	photo: {
		desktop: IGalleryImageItem;
		tablet: IGalleryImageItem;
		mobile: IGalleryImageItem;
	};
}

export interface ISchemaContentVideo {
	video: {
		videoSrc: string;
		poster: IGalleryImageItem;
	};
}

export interface ISchemaContentLink {
	id: string;
	active?: boolean;
	href: {
		src: string;
		internal_src: string;
	};
	settings?: {
		rel: LinkRelType;
		target: LinkTargetType;
	};
}

export interface ISchemaContentText {
	title: Record<string, Record<"value", string>>;
}

export interface ISchemaContentTextFill extends ISchemaContentText {}

export interface ISchemaContent
	extends ISchemaContentPhoto,
		ISchemaContentVideo,
		ISchemaContentText,
		ISchemaContentLink {}
