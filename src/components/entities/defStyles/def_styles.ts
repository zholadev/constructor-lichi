import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";

interface IDefaultStyles {
	ELEMENT: Record<ElementBaseTypes, Record<string, unknown>>;
	COMPONENTS: Record<ComponentBaseTypes, Record<string, unknown>>;
}

export const defaultStyles: IDefaultStyles = {
	ELEMENT: {
		button: {
			border: "1px solid #000000",
			padding: "10px 15px",
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
	},
};
