import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { IContainerType } from "@/components/shared/types/types";

interface IDefaultStyles {
	ELEMENT: Record<ElementBaseTypes, Record<string, unknown>>;
	COMPONENTS: Record<
		ComponentBaseTypes | ComponentSpecialTypes,
		Record<string, unknown>
	>;
	CONTAINERS: Record<IContainerType, Record<string, unknown>>;
}

export const defaultStyles: IDefaultStyles = {
	ELEMENT: {
		button: {
			border: "1px solid #000000",
			padding: "10px 15px 10px 15px",
			textAlign: "center",
			fontFamily: "Futura PT",
			color: "#000000",
			colorDark: "#ffffff",
			borderDark: "1px solid #ffffff",
		},
		text: {
			fontFamily: "Futura PT",
			textAlign: "center",
			color: "#000000",
			colorDark: "#ffffff",
		},
		timer: {
			color: "#000000",
			colorDark: "#ffffff",
			fontSize: "20px",
			fontFamily: "Futura PT",
		},
	},
	COMPONENTS: {
		card: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		card_outside: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		album: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		album_outside: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		video: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		video_outside: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		saint_laurent: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		}
	},
	CONTAINERS: {
		saint_laurent_container: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		container: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		swiper: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
		category_list_container: {
			backgroundColor: "#ffffff",
			backgroundColorDark: "#181a1b",
		},
	},
};
