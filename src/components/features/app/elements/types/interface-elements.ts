import { ElementBaseTypes } from "@/components/shared/types/types-components";
import {
	ISchemaContentLink,
	ISchemaContentText,
} from "@/components/shared/types/interface-schema-content";
import { ISchemaSettingsTimer } from "@/components/shared/types/interface-schema-settings";

export interface IElementSchema {
	id: string;
	guid: string;
	type: ElementBaseTypes;
	style: Record<string, unknown>;
	version: string;
}

export interface ITimerSchema {
	expiredDate: Date;
}

export interface IButtonElement extends IElementSchema {
	content: {
		title: ISchemaContentText;
		link?: ISchemaContentLink;
	};
}

export interface ITextElement extends IElementSchema {
	content: {
		title: ISchemaContentText;
		link?: ISchemaContentLink;
	};
}

export interface ITimerElement extends IElementSchema {
	setting: {
		timer: ISchemaSettingsTimer;
	};
}

export type IElementTotal = IButtonElement | ITextElement | ITimerElement;
