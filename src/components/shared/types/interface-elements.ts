import { ILinkDesign } from "@/components/shared/types/interface-design";
import { ElementBaseTypes } from "@/components/shared/types/types-components";

export interface IElementSchema {
	id: string;
	type: ElementBaseTypes;
	style: Record<string, unknown>;
	version: string;
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
