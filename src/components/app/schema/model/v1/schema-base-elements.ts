import { v4 as uuidv4 } from "uuid";
import {
	ISchemaButtonElement,
	ISchemaTextElement,
	ISchemaTimerElement,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { getFormattedDateSixDaysAhead } from "@/components/shared/utils/utils";
import { defaultStyles } from "@/components/entities/defStyles/def_styles";

/**
 * @author Zholaman Zhumanov
 * @description Схемы для элементов
 * @todo Типизация
 * @param version
 */
export const button_schema_element = (
	version: string
): ISchemaButtonElement => {
	// @ts-ignore
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

export const text_schema_element = (version: string): ISchemaTextElement => {
	// @ts-ignore
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

export const timer_schema_element = (version: string): ISchemaTimerElement => {
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
				targetTime: new Date(),
				counter: {
					style: {
						textTransform: "uppercase",
					},
				},
				unit: {
					style: {
						textTransform: "uppercase",
					},
				},
			},
			view: {
				darkTheme: true,
			},
		},
	};
};
