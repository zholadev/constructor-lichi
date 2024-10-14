import { ISchemaContentMediaType } from "@/components/shared/types/interface-schema-content";

export interface ISchemaSettingsView {
	heightFull?: boolean;
	navbarThemeMode?: boolean;
	contentType?: ISchemaContentMediaType;
	darkTheme: boolean;
}

export type SwiperDirectionType = "vertical" | "horizontal";
export type SwiperPaginationType = "bullet" | "fraction";
export type SwiperPaginationPositionType = "top" | "bottom" | "left" | "right";
export type SwiperPaginationThemeType = "light" | "dark";

export interface SwiperSettings {
	pagination: boolean;
	autoplay: boolean;
	loop: boolean;
	slidePerView: number;
	slidePerGroup: number;
	speed_advanced: {
		delay: number;
		speed: number;
	};
	centeredSlides: boolean;
	spaceBetween: number;
	direction: SwiperDirectionType;
	pagination_type: SwiperPaginationType;
	autoHeight: boolean;
	paginationPosition: SwiperPaginationPositionType;
	paginationTheme: SwiperPaginationThemeType;
	mousewheel: boolean;
}

export type SchemaShowSiteType = "base" | "retail" | "all";
export type SchemaSettingElementPositionX = "left" | "right" | "center";
export type SchemaSettingElementPositionY = "top" | "bottom" | "center";

export interface IShowSiteType {
	id: number;
	value: SchemaShowSiteType;
	name: string;
}

export interface ISchemaSettingsShow {
	siteType: SchemaShowSiteType;
}

export interface ISchemaSettingsTimer {
	targetDate: string | Date;
	targetTime: string | Date;
	counter: {
		style: Record<string, unknown>;
	};
	unit: {
		style: Record<string, unknown>;
	};
}

export interface ISchemaSettingsElement {
	style: {
		justifyContent: string;
		alignItems: string;
		gap: number;
		flexDirection: string;
	};
}

export interface ISchemaSettingCategoryListParams {
	shop: number;
	category: string;
	limit: number;
	cardType: "card" | "card_outside";
}

export interface ISchemaSettings {
	view?: ISchemaSettingsView;
	show?: ISchemaSettingsShow;
	element?: ISchemaSettingsElement;
	swiper?: SwiperSettings;
	categoryList?: ISchemaSettingCategoryListParams;
	timer?: ISchemaSettingsTimer;
}
