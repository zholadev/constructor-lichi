import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import { ComponentBaseTypes, ComponentSpecialTypes } from "./types-components";

export type TemplateBaseType = "container" | "swiper";

export interface ITemplateBase {
	id: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
}

export interface ITemplateBaseSchema extends ITemplateBase {
	components: Array<{
		id: string;
		data: IComponentTotalDataSchema;
		is_selected: boolean;
	}>;
}

export interface IComponentBaseAddList {
	id: number;
	type: ComponentBaseTypes;
	version: string;
}
export interface IComponentSpecialAddList {
	id: number;
	type: ComponentSpecialTypes;
	version: string;
}

export interface IComponentBaseSchema {
	id: string;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: [];
	content: {
		photo: {
			thumbnail: unknown;
		};
	};
}
