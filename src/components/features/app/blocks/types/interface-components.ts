import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import { IGalleryImageItem } from "@/components/shared/types/interface";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";

export interface IComponentBaseSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: IElementTotal[];
}
export interface IComponentBaseFullSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements?: IElementTotal[];
	content?: [];
}

export interface IComponentWithPhotoContent {
	photo: {
		desktop: IGalleryImageItem;
		tablet: IGalleryImageItem;
		mobile: IGalleryImageItem;
	};
}

export interface IComponentWithVideoContent {
	video: {
		videoSrc: string;
		poster: IGalleryImageItem | null;
	};
}

export interface IComponentNotSelected extends IComponentBaseSchema {
	type: "notSelected";
}

export interface IComponentCardSchema extends IComponentBaseSchema {
	content: IComponentWithPhotoContent;
}

export interface IComponentCardVideoSchema extends IComponentBaseSchema {
	content: IComponentWithVideoContent;
}

export type IComponentTotalDataSchema =
	| IComponentCardSchema
	| IComponentCardVideoSchema;
