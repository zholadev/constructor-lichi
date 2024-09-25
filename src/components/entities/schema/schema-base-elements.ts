import { v4 as uuidv4 } from "uuid";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";

export const button_schema_element = (): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "button",
		version: versionComponentBase.card.version,
		style: {
			border: "1px solid #ffffff",
			padding: "10px 15px",
			textAlign: "center",
			color: "#ffffff",
		},
	};
};

export const text_schema_element = (): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "text",
		version: versionComponentBase.card.version,
		style: {
			textAlign: "center",
			fontFamily: "Futura PT",
		},
	};
};
