import React from "react";
import {
	ComponentBaseTypes,
	ComponentSwiperBaseTypes,
	ElementBasenameTypes,
	ElementBaseTypes,
} from "./types-components";

export type TemplateBaseType = "container" | "swiper";

export interface ITemplateBaseSchema {
	id: string;
	type: TemplateBaseType;
	version: string;
	style: Record<string, unknown>;
	components: Array<{
		id: string;
		data?: {
			id: string;
			type: ComponentBaseTypes;
			version: string;
			style: Record<string, unknown>;
			elements: unknown;
			content: Record<string, unknown>;
		};
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
	elements: unknown;
	content: {
		photo: {
			thumbnail: unknown;
		};
	};
}

export interface IComponentSwiperBase {
	id: string;
	type: ComponentSwiperBaseTypes;
	version: string;
	style: Record<string, unknown>;
	elements: unknown;
	settings: Record<string, unknown>;
}

export interface IElementBase {
	id: number;
	type: ElementBaseTypes;
	name: ElementBasenameTypes;
	version: string;
	style: Record<string, unknown>;
	icon: React.JSX.Element;
}
