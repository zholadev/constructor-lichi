import { IComponentTotalDataSchema } from "@/components/features/app/blocks/types/interface-components";
import { ComponentBaseTypes } from "./types-components";

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

export interface IComponentBaseList {
	id: number;
	type: ComponentBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: unknown;
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
