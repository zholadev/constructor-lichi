import {
	ElementBasenameTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import React from "react";

export interface IElementBaseListData {
	id: number;
	type: ElementBaseTypes;
	name: ElementBasenameTypes;
	version: string;
	style: Record<string, unknown>;
	icon: React.JSX.Element;
}
