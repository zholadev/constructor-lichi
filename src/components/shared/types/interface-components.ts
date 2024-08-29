import {
	ComponentBaseTypes,
	ComponentSwiperBaseTypes,
} from "@/components/shared/types/types-components";

export type TemplateBaseType = "container" | "swiper";

export interface ITemplateBaseSchema {
	id: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
	components: Array<{ id: string }>;
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
	elements: unknown;
}

export interface IComponentSwiperBase {
	id: string;
	type: ComponentSwiperBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: unknown;
	settings: Record<string, unknown>;
}
