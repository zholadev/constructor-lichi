import {
	ComponentBaseTypes,
	ElementBaseTypes,
} from "@/components/shared/types/types-components";
import { SwiperSettings } from "@/components/shared/types/interface-schema-settings";

interface IDefaultSettings {
	ELEMENT: Record<ElementBaseTypes, Record<string, unknown>>;
	COMPONENTS: Record<ComponentBaseTypes, Record<string, unknown>>;
	CONTAINERS: {
		container: Record<string, unknown>;
		swiper: SwiperSettings;
	};
}

export const defaultSettings: IDefaultSettings = {
	CONTAINERS: {
		container: {},
		swiper: {
			pagination: false,
			autoplay: false,
			loop: false,
			slidePerView: 5,
			slidePerGroup: 1,
			spaceBetween: 10,
			speed_advanced: {
				delay: 700,
				duration: 1000,
			},
			speed: false,
			centeredSlides: false,
			direction: "horizontal",
			pagination_type: "bullet",
			autoHeight: false,
		},
	},
};
