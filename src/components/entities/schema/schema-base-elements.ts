import { v4 as uuidv4 } from "uuid";
import { versionElementBase } from "@/components/app/versions/version-modules";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";

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

/**
 * Возвращает строку даты в формате 06 Oct 2024 на 6 дней вперед.
 * @returns {string}
 */
function getFormattedDateSixDaysAhead(): string {
	const today = new Date();
	today.setDate(today.getDate() + 6);

	const day = today.getDate().toString().padStart(2, "0");
	const month = today.toLocaleString("en-US", { month: "short" });
	const year = today.getFullYear();

	return `${day} ${month} ${year}`;
}

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
		setting: {
			timer: {
				targetDate: getFormattedDateSixDaysAhead(),
				targetTime: "00:00:00",
			},
		},
	};
};
