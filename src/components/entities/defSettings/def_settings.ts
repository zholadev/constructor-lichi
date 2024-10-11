import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { SwiperSettings } from "@/components/shared/types/interface-schema-settings";
// @todo переделать
interface IDefaultSettings {
	ELEMENT: Record<ElementBaseTypes, Record<string, unknown>>;
	COMPONENTS: Record<ComponentBaseTypes, Record<string, unknown>>;
	CONTAINERS: {
		container: Record<string, unknown>;
		swiper: SwiperSettings;
		saint_laurent_swiper: SwiperSettings;
	};
}

export const defaultSettings: IDefaultSettings = {
	CONTAINERS: {
		container: {},
		swiper: {
			pagination: false,
			autoplay: false,
			loop: false,
			slidePerView: 3.2,
			slidePerGroup: 1,
			spaceBetween: 10,
			speed_advanced: {
				delay: 1000,
				speed: 700,
			},
			centeredSlides: false,
			direction: "horizontal",
			pagination_type: "bullet",
			autoHeight: false,
			paginationPosition: "bottom",
			paginationTheme: "light",
			mousewheel: false,
		},
		saint_laurent_swiper: {
			pagination: false,
			autoplay: false,
			loop: false,
			slidePerView: 1,
			slidePerGroup: 1,
			spaceBetween: 10,
			speed_advanced: {
				delay: 1000,
				speed: 700,
			},
			centeredSlides: false,
			direction: "horizontal",
			pagination_type: "bullet",
			autoHeight: false,
			paginationPosition: "bottom",
			paginationTheme: "light",
			mousewheel: false,
		}
	},
	COMPONENTS: {},
	ELEMENT: {},
};
