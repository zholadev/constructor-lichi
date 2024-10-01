import { v4 as uuidv4 } from "uuid";
import { versionElementBase } from "@/components/app/versions/version-modules";
import { IElementTotal } from "@/components/features/app/ui/elements/types/interface-elements";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";

export const button_schema_element = (): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "button",
		version: versionElementBase.button.version,
		style: {
			...defaultStyles.ELEMENT.button,
		},
		settings: {
			view: {
				darkTheme: true,
			},
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
			...defaultStyles.ELEMENT.text,
		},
		settings: {
			view: {
				darkTheme: true,
			},
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
			...defaultStyles.ELEMENT.timer,
		},
		settings: {
			timer: {
				targetDate: getFormattedDateSixDaysAhead(),
				targetTime: "00:00:00",
			},
			view: {
				darkTheme: true,
			},
		},
	};
};
