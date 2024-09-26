import { v4 as uuidv4 } from "uuid";
import { versionElementBase } from "@/components/app/versions/version-modules";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";

export const button_schema_element = (): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "button",
		version: versionElementBase.button.version,
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
		version: versionElementBase.text.version,
		style: {
			textAlign: "center",
			fontFamily: "Futura PT",
		},
	};
};

export const timer_schema_element = (): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "timer",
		version: versionElementBase.timer.version,
		style: {
			textAlign: "center",
			fontFamily: "Futura PT",
		},
		settings: {
			timer: {
				targetDate: getFormattedDateSixDaysAhead(),
				targetTime: "00:00:00",
			},
		},
	};
};
