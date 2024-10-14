import {
	SchemaComponentTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { IContainerType } from "@/components/shared/types/types";

const commonStyles = {
	fontFamily: "Futura PT",
	defaultColor: "#000000",
	darkColor: "#ffffff",
	defaultBackgroundColor: "#ffffff",
	darkBackgroundColor: "#181a1b",
};

interface IDefaultStyles {
	ELEMENT: Record<ElementBaseTypes, Record<string, unknown>>;
	COMPONENTS: Record<SchemaComponentTypes, Record<string, unknown>>;
	CONTAINERS: Record<IContainerType, Record<string, unknown>>;
}

// @ts-ignore
export const defaultStyles: IDefaultStyles = {
	COMPONENTS: {
		card: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		card_outside: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		album: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		album_outside: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		saint_laurent: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		none: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
	},
	CONTAINERS: {
		saint_laurent_container: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		container: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		category_list_container: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
		initial: {
			backgroundColor: commonStyles.defaultBackgroundColor,
			backgroundColorDark: commonStyles.darkBackgroundColor,
		},
	},
	ELEMENT: {
		button: {
			border: `1px solid ${commonStyles.defaultColor}`,
			padding: [10, 15, 10, 15],
			textAlign: "center",
			fontFamily: commonStyles.fontFamily,
			color: commonStyles.defaultColor,
			colorDark: commonStyles.darkColor,
			borderDark: `1px solid ${commonStyles.darkColor}`,
		},
		text: {
			fontFamily: commonStyles.fontFamily,
			textAlign: "center",
			color: commonStyles.defaultColor,
			colorDark: commonStyles.darkColor,
		},
		timer: {
			color: commonStyles.defaultColor,
			colorDark: commonStyles.darkColor,
			fontFamily: commonStyles.fontFamily,
		},
	},
};
