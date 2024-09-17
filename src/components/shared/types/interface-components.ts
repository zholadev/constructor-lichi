import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import { IGalleryImageItem } from "@/components/shared/types/interface";

export interface IComponentBaseSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: [];
}

export interface IComponentCardSchema extends IComponentBaseSchema {
	content: {
		photo: {
			desktop: IGalleryImageItem;
			tablet: IGalleryImageItem;
			mobile: IGalleryImageItem;
		};
	};
}

export interface IComponentCardVideoSchema extends IComponentBaseSchema {
	content: {
		video: {
			videoSrc: string;
			poster: {
				desktop: IGalleryImageItem;
				tablet: IGalleryImageItem;
				mobile: IGalleryImageItem;
			};
		};
	};
}
