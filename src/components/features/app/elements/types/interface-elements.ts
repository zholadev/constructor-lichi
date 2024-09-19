import { ElementBaseTypes } from "@/components/shared/types/types-components";
import {
	LinkRelType,
	LinkTargetType,
} from "@/components/shared/types/types-design";

export interface IElementSchema {
	id: string;
	type: ElementBaseTypes;
	style: Record<string, unknown>;
	version: string;
}

export interface ILinkDesign {
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

export interface IButtonElement extends IElementSchema {
	content: {
		title: Record<string, Record<"value", string>>;
		link?: ILinkDesign;
	};
}

export interface ITextElement extends IElementSchema {
	content: {
		title: Record<string, Record<"value", string>>;
		link?: ILinkDesign;
	};
}

export type IElementTotal = IButtonElement | ITextElement;
