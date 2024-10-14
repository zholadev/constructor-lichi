import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";

// @todo переделать

interface IDefaultSettings {
	CONTAINERS: {
		container: {
			block: ISchemaSettings;
			swiper: ISchemaSettings;
		};
		category_list_container: ISchemaSettings;
		saint_laurent_container: {
			block: ISchemaSettings;
			swiper: ISchemaSettings;
		};
	};
}

export const defaultSettings: IDefaultSettings = {
	CONTAINERS: {
		container: {
			block: {
				view: {
					darkTheme: true,
					heightFull: false,
					navbarThemeMode: false,
				},
				show: {
					siteType: "all",
				},
			},
			swiper: {
				view: {
					darkTheme: true,
					heightFull: false,
					navbarThemeMode: false,
				},
				show: {
					siteType: "all",
				},
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
			},
		},
		saint_laurent_container: {
			block: {
				view: {
					darkTheme: true,
					heightFull: true,
					navbarThemeMode: false,
				},
				show: {
					siteType: "all",
				},
			},
			swiper: {
				view: {
					darkTheme: true,
					heightFull: true,
					navbarThemeMode: false,
				},
				show: {
					siteType: "all",
				},
				swiper: {
					pagination: false,
					autoplay: false,
					loop: false,
					slidePerView: 1,
					slidePerGroup: 1,
					spaceBetween: 0,
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
			},
		},
		category_list_container: {
			view: {
				darkTheme: true,
				heightFull: true,
				navbarThemeMode: false,
			},
			show: {
				siteType: "all",
			},
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
		},
	}
};
