import { v4 as uuidv4 } from "uuid";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";

export const button_schema_element = (version: string): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "button",
		version,
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

export const text_schema_element = (version: string): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "text",
		version,
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

export const timer_schema_element = (version: string): IElementTotal => {
	return {
		id: uuidv4(),
		guid: uuidv4(),
		type: "timer",
		version,
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
