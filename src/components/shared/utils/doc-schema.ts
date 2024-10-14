import {ISchemaContainer} from "@/components/shared/types/interface-schema-container";

type IObject = Record<string, unknown>;

const doc_id_params: IObject = { id: "a404d0df-8b86-4544-ae74-4fd8260758e7" };
const doc_guid_params: IObject = {
	guid: "a404d0df-8b86-4544-ae74-4fd8260758e7",
};
const doc_type_params: IObject = { type: "container" };
const doc_version_params: IObject = { version: "1.0" };
const doc_style_params: IObject = {
	style: {
		margin: [3, 7, 4, 1],
		padding: [3, 5, 0, 0],
		fontSize: 12,
		backgroundColor: "#ffffff",
		backgroundColorDark: "rgb(24, 26, 27)",
		display: "grid",
		gap: "2px",
		gridTemplateColumns: "1fr",
	},
};
const doc_style_bg_params: IObject = {
	backgroundColor: "#ffffff",
	backgroundColorDark: "rgb(24, 26, 27)",
};
const doc_page_type = {
	template_type: "page",
	types: ["page", "creative"],
};
const doc_display_params: IObject = {
	display: "block",
	types: ["block", "swiper"],
};
const doc_style_border_params: IObject = {
	border: "1px solid #000000",
	borderDark: "1px solid #ffffff",
	borderBottomDark: "1px solid #ffffff",
	borderBottom: "1px solid #ffffff",
	borderLeft: "1px solid #ffffff",
	borderLeftDark: "1px solid #ffffff",
	borderTop: "1px solid #ffffff",
	borderTopDark: "1px solid #ffffff",
	borderRight: "1px solid #ffffff",
	borderRightDark: "1px solid #ffffff",
};
const doc_style_border_radius_params: IObject = {
	borderRadius: 0,
	borderBottomLeftRadius: 0,
	borderBottomRightRadius: 0,
	borderTopLeftRadius: 0,
	borderTopRightRadius: 0,
};
const doc_style_grid_params: IObject = {
	display: "grid",
	gridTemplateColumns: "1fr",
	gap: "2px",
};
const doc_style_flex_params: IObject = {
	display: "flex",
	flexDirection: "row",
	gap: "2px",
	justifyContent: "space-between",
	alignItems: "center",
};
const doc_style_spacing_params: IObject = {
	padding: [0, 4, 0, 0],
	margin: [0, 4, 0, 0],
};
const doc_style_size_params: IObject = {
	width: [100, "100%"],
	height: [100, "100%"],
};
const doc_style_ff_params: IObject = {
	fontFamily: "Bodoni Cyrillic",
	textAlign: "right",
	color: "#ce4646",
	colorDark: "#ffffff",
	fontSize: 18,
	fontWeight: "400",
	fontStyle: "normal",
	textDecoration: "underline",
};

const doc_settings_params: IObject = {
	settings: {
		view: {
			darkTheme: true,
			contentType: "image",
			heightFull: false,
			navbarThemeMode: false,
		},
		show: {
			siteType: "all",
		},
		element: {
			style: {
				justifyContent: "space-between",
				alignItems: "center",
				gap: 10,
				flexDirection: "column",
			},
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
		timer: {
			targetDate: "Dec 19 2024",
			targetTime: "00:00:00",
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
		categoryList: {
			shop: 1,
			category: "new",
			limit: 11,
			cardType: "card",
		},
	},
};

const doc_setting_element_params: IObject = {
	element: {
		style: {
			justifyContent: "space-between",
			alignItems: "center",
			gap: 10,
			flexDirection: "column",
		},
	},
};

const doc_setting_swiper_params: IObject = {
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
};

const doc_setting_timer_params: IObject = {
	timer: {
		targetDate: "Dec 19 2024",
		targetTime: "00:00:00",
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
};
const doc_setting_view_params: IObject = {
	view: {
		darkTheme: true,
		contentType: "image",
		heightFull: false,
		navbarThemeMode: false,
	},
};
const doc_setting_category_list_params: IObject = {
	categoryList: {
		shop: 1,
		category: "new",
		limit: 11,
		cardType: "card",
	},
};
const doc_setting_show_params: IObject = {
	show: {
		siteType: "all",
	},
};
const doc_content_params: IObject = {
	photo: {
		desktop: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		tablet: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		mobile: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
	},
	video: {
		poster: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		videoSrc: "https://vimeo/video/1212121212",
	},
	title: {
		en: {
			value: "Английский",
		},
		ar: {
			value: "Арабский",
		},
		de: {
			value: "Немецкий",
		},
		pl: {
			value: "Польский",
		},
		fr: {
			value: "Французский",
		},
		ru: {
			value: "Русский",
		},
	},
	animation: {
		type: "zoom_out",
		observer: true,
	},
	link: {
		href: {
			src: "https://lichi.com/ru/ru/new",
			internal_src: "new",
		},
	},
};
const doc_content_photo_params: IObject = {
	photo: {
		desktop: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		tablet: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		mobile: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
	},
};
const doc_content_video_params: IObject = {
	video: {
		poster: {
			url: "https://cdn3.lichi.com/constructor/static/september/IMG_3843.jpg",
			public_url:
				"https://static.lichi.com/constructor/september/IMG_3843.jpg",
			path: "/september/IMG_3843.jpg",
			info: {
				width: 1920,
				height: 1000,
				luminance: 66.13,
			},
		},
		videoSrc: "https://vimeo/video/1212121212",
	},
};

const doc_content_text_params: IObject = {
	title: {
		en: {
			value: "Английский",
		},
		ar: {
			value: "Арабский",
		},
		de: {
			value: "Немецкий",
		},
		pl: {
			value: "Польский",
		},
		fr: {
			value: "Французский",
		},
		ru: {
			value: "Русский",
		},
	},
};

const doc_content_link_params: IObject = {
	link: {
		href: {
			src: "https://lichi.com/ru/ru/new",
			internal_src: "new",
		},
	},
};

const doc_content_animation_params: IObject = {
	animation: {
		type: "zoom_out",
		observer: true,
	},
};
const doc_elements_params: IObject = {
	elements: [
		{
			id: "43978522-bfd6-4e70-aaa2-e3ade733f05f",
			guid: "906fd070-3343-46b0-87ba-3d5eacef728f",
			type: "text",
			style: {
				fontFamily: "Futura PT",
				textAlign: "center",
				color: "#000000",
				colorDark: "#ffffff",
			},
			settings: {
				view: {
					darkTheme: true,
				},
			},
			content: {
				title: {
					en: {
						value: "Английский",
					},
					ar: {
						value: "Арабский",
					},
					de: {
						value: "Немецкий",
					},
					pl: {
						value: "Польский",
					},
					fr: {
						value: "Французский",
					},
					ru: {
						value: "Русский",
					},
				},
			},
		},
		{
			id: "2893c453-5fff-4782-be84-ebd326eef845",
			guid: "9a412ba9-543a-429c-a19e-20ea3ea03935",
			type: "button",
			style: {
				border: "1px solid #000000",
				padding: "10px 15px 10px 15px",
				textAlign: "center",
				fontFamily: "Futura PT",
				color: "#000000",
				colorDark: "#ffffff",
				borderDark: "1px solid #ffffff",
			},
			settings: {
				view: {
					darkTheme: true,
				},
			},
			content: {
				title: {
					en: {
						value: "Английский",
					},
					ar: {
						value: "Арабский",
					},
					de: {
						value: "Немецкий",
					},
					pl: {
						value: "Польский",
					},
					fr: {
						value: "Французский",
					},
					ru: {
						value: "Русский",
					},
				},
				link: {
					href: {
						src: "https://lichi.com/ru/ru/new",
						internal_src: "new",
					},
				},
			},
		},
		{
			id: "3503d788-01d6-4b20-bcd0-a2b83e30a5ec",
			guid: "a71a3eb5-6032-40a7-8db0-dae576e4c3c1",
			type: "timer",
			style: {
				color: "#000000",
				colorDark: "#ffffff",
				fontSize: "20px",
				fontFamily: "Futura PT",
			},
			settings: {
				timer: {
					targetDate: "19 Oct 2024",
					targetTime: "2024-10-13T16:14:32.499Z",
					counter: {
						style: {
							textTransform: "uppercase",
							fontFamily: "Futura PT",
							fontSize: 22,
							textAlign: "center",
							fontWeight: "500",
							color: "#f51414",
							fontStyle: "normal",
							textDecoration: "initial",
							colorDark: "#ffffff",
						},
					},
					unit: {
						style: {
							textTransform: "uppercase",
							fontFamily: "Bodoni Cyrillic",
							fontSize: 14,
							textAlign: "left",
							fontWeight: "400",
							color: "#ec5555",
							fontStyle: "normal",
							textDecoration: "initial",
							colorDark: "#ffffff",
						},
					},
				},
				view: {
					darkTheme: true,
				},
			},
		},
	],
};
const doc_components_params: IObject = {
	components: [
		{
			id: "b465c2d1-7802-4252-a7ae-36b5730d2613",
			guid: "83c5a5b4-62a9-4bfa-906b-c183e7997692",
			type: "album",
			version: "1.0",
			style: {
				backgroundColor: "#ffffff",
				backgroundColorDark: "#181a1b",
			},
			elements: [],
			content: {
				photo: {
					desktop: {
						url: "https://cdn3.lichi.com/constructor/static/poster-weddffing-xs.jpg",
						public_url:
							"https://static.lichi.com/constructor/poster-weddffing-xs.jpg",
						path: "/poster-weddffing-xs.jpg",
						name: "poster-weddffing-xs.jpg",
						size: 148449,
						created: 1686047077,
						extension: "jpg",
						info: {
							width: 1920,
							height: 1080,
							luminance: 48.75,
						},
					},
					tablet: {
						url: "https://cdn3.lichi.com/constructor/static/poster-weddffing-xs.jpg",
						public_url:
							"https://static.lichi.com/constructor/poster-weddffing-xs.jpg",
						path: "/poster-weddffing-xs.jpg",
						name: "poster-weddffing-xs.jpg",
						size: 148449,
						created: 1686047077,
						extension: "jpg",
						info: {
							width: 1920,
							height: 1080,
							luminance: 48.75,
						},
					},
					mobile: {
						url: "https://cdn3.lichi.com/constructor/static/poster-weddffing-xs.jpg",
						public_url:
							"https://static.lichi.com/constructor/poster-weddffing-xs.jpg",
						path: "/poster-weddffing-xs.jpg",
						name: "poster-weddffing-xs.jpg",
						size: 148449,
						created: 1686047077,
						extension: "jpg",
						info: {
							width: 1920,
							height: 1080,
							luminance: 48.75,
						},
					},
				},
			},
			settings: {
				view: {
					contentType: "image",
					darkTheme: true,
				},
				element: {
					style: {
						justifyContent: "flex-end",
						alignItems: "center",
						gap: 0,
						flexDirection: "column",
					},
				},
			},
		},
	],
};
const doc_category_list_params: IObject = {
	id: "bebb58a6-b3d0-4a08-baec-6bb0ec92f7cd",
	guid: "d6a95e81-d0fe-427b-a2c9-922a7707f18d",
	type: "category_list_container",
	version: "1.0",
	style: {
		margin: "0 0 2px 0",
		backgroundColor: "#ffffff",
		backgroundColorDark: "#181a1b",
		display: "block",
	},
	display: "swiper",
	settings: {
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
		categoryList: {
			shop: 1,
			category: "new",
			limit: 11,
			cardType: "card",
		},
	},
};

const doc_saint_laurent_container_params: IObject = {
	id: "b66b1be3-ec94-475c-afca-63e701c5c8e1",
	guid: "f88b31d8-812d-42fe-94b5-72250f055dc8",
	type: "saint_laurent_container",
	version: "1.0.0",
	display: "block",
	style: {
		margin: "0 0 2px 0",
		backgroundColor: "#ffffff",
		backgroundColorDark: "#181a1b",
		display: "grid",
		gap: "60px",
		justifyContent: "center",
		alignItems: "center",
		gridTemplateColumns: "1fr 1fr",
	},
	components: [
		{
			id: "7a18119e-ffe0-40b5-8466-c0e949dc1ea6",
			data: {
				id: "6a291a00-812c-4c51-b7d7-f3743a15c501",
				guid: "d91195a0-59a7-41fb-92f5-a500012e8d6c",
				type: "saint_laurent",
				version: "dev-1.0.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [],
				content: {
					photo: {
						desktop: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
						tablet: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-6.c5257a3d.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						positionX: "center",
						positionY: "bottom",
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
						},
					},
				},
			},
		},
		{
			id: "cc01e852-2f6b-4310-a3bb-e3e1e550e113",
			data: {
				id: "69f1a7cf-0ab4-4790-861d-93a2023658a4",
				guid: "e0abe318-29f3-4bd5-8e13-39eca877d1f4",
				type: "saint_laurent",
				version: "dev-1.0.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [],
				content: {
					photo: {
						desktop: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
						tablet: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-2.423fb09d.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						positionX: "center",
						positionY: "bottom",
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
						},
					},
				},
			},
		},
	],
	settings: {
		view: {
			darkTheme: true,
			heightFull: true,
		},
	},
};

const doc_widget_params: IObject = {
	widgets: {
		type: "stories",
		data: [
			{
				guid: "41d544d6-f194-4c0f-b11b-7a48fe543ff6",
				type: "card",
				version: "1.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [
					{
						id: "0061e739-48fa-4356-82cd-feb354539c63",
						guid: "2842f942-6a90-4a4c-bddb-d86e454a03e1",
						type: "text",
						style: {
							fontFamily: "Futura PT",
							textAlign: "center",
							color: "#000000",
							colorDark: "#ffffff",
						},
						settings: {
							view: {
								darkTheme: true,
							},
						},
						content: {
							title: {
								en: {
									value: "Английский",
								},
								ar: {
									value: "Арабский",
								},
								de: {
									value: "Немецкий",
								},
								pl: {
									value: "Польский",
								},
								fr: {
									value: "Французский",
								},
								ru: {
									value: "Русский",
								},
							},
						},
					},
					{
						id: "a8281b3f-f5b1-4389-a46a-e904c91d90d0",
						guid: "d205ad4d-387e-4875-b4eb-8c63bcd187bc",
						type: "button",
						style: {
							border: "1px solid #000000",
							padding: "10px 15px 10px 15px",
							textAlign: "center",
							fontFamily: "Futura PT",
							color: "#000000",
							colorDark: "#ffffff",
							borderDark: "1px solid #ffffff",
						},
						settings: {
							view: {
								darkTheme: true,
							},
						},
						content: {
							title: {
								en: {
									value: "Английский",
								},
								ar: {
									value: "Арабский",
								},
								de: {
									value: "Немецкий",
								},
								pl: {
									value: "Польский",
								},
								fr: {
									value: "Французский",
								},
								ru: {
									value: "Русский",
								},
							},
						},
					},
				],
				content: {
					photo: {
						desktop: {
							url: "https://cdn3.lichi.com/constructor/static/LICH0444_.jpg",
							public_url:
								"https://static.lichi.com/constructor/LICH0444_.jpg",
							path: "/LICH0444_.jpg",
							name: "LICH0444_.jpg",
							size: 1621510,
							created: 1670420168,
							extension: "jpg",
							info: {
								width: 3024,
								height: 3780,
								luminance: 46.02,
							},
						},
						tablet: {
							url: "/_next/static/media/card-1.f759c754.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-1.f759c754.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
							gap: 0,
							flexDirection: "column",
						},
					},
				},
				id: "5ba42134-25e9-42b7-a70b-72d6cc484d74",
			},
			{
				guid: "aa5227de-e15b-4085-8c1e-a1bd938339dc",
				type: "card_outside",
				version: "1.0",
				style: {
					backgroundColor: "#ffffff",
					backgroundColorDark: "#181a1b",
				},
				elements: [
					{
						id: "352aa5b2-5355-45ba-9cf2-7e6c8d3de949",
						guid: "3e247a8d-f4b9-4181-ad95-3d972c6fbf35",
						type: "text",
						style: {
							fontFamily: "Futura PT",
							textAlign: "center",
							color: "#000000",
							colorDark: "#ffffff",
						},
						settings: {
							view: {
								darkTheme: true,
							},
						},
						content: {
							title: {
								en: {
									value: "Английский",
								},
								ar: {
									value: "Арабский",
								},
								de: {
									value: "Немецкий",
								},
								pl: {
									value: "Польский",
								},
								fr: {
									value: "Французский",
								},
								ru: {
									value: "Русский",
								},
							},
						},
					},
					{
						id: "ab9f98c7-5677-49af-9350-e8cb872f7b4f",
						guid: "e1404e0d-5ea9-4bb1-8a28-9ed24034e129",
						type: "button",
						style: {
							border: "1px solid #000000",
							padding: "10px 15px 10px 15px",
							textAlign: "center",
							fontFamily: "Futura PT",
							color: "#000000",
							colorDark: "#ffffff",
							borderDark: "1px solid #ffffff",
						},
						settings: {
							view: {
								darkTheme: true,
							},
						},
						content: {
							title: {
								en: {
									value: "Английский",
								},
								ar: {
									value: "Арабский",
								},
								de: {
									value: "Немецкий",
								},
								pl: {
									value: "Польский",
								},
								fr: {
									value: "Французский",
								},
								ru: {
									value: "Русский",
								},
							},
						},
					},
				],
				content: {
					photo: {
						desktop: {
							url: "https://cdn3.lichi.com/constructor/static/LICH0444_.jpg",
							public_url:
								"https://static.lichi.com/constructor/LICH0444_.jpg",
							path: "/LICH0444_.jpg",
							name: "LICH0444_.jpg",
							size: 1621510,
							created: 1670420168,
							extension: "jpg",
							info: {
								width: 3024,
								height: 3780,
								luminance: 46.02,
							},
						},
						tablet: {
							url: "/_next/static/media/card-1.f759c754.jpg",
						},
						mobile: {
							url: "/_next/static/media/card-1.f759c754.jpg",
						},
					},
				},
				settings: {
					view: {
						contentType: "image",
						darkTheme: true,
					},
					element: {
						style: {
							justifyContent: "flex-end",
							alignItems: "center",
							gap: 0,
							flexDirection: "column",
						},
					},
				},
				id: "caa7ff27-7e25-4766-bf64-a11ef398b378",
			},
		],
	},
};

const doc_container_params: IObject = {
	id: "a404d0df-8b86-4544-ae74-4fd8260758e7",
	guid: "a404d0df-8b86-4544-ae74-4fd82607582e3",
	type: "container",
	version: "1.0",
	display: "block",
	style: {
		display: "grid",
		gridTemplateColumns: "1fr 1fr",
		gap: "54px",
	},
	settings: {
		view: {
			heightFull: true,
			darkTheme: true,
		},
	},
	components: [],
};

export const schemaDocParams = {
	doc_id_params,
	doc_guid_params,
	doc_type_params,
	doc_style_params,
	doc_display_params,
	doc_page_type,
	doc_style_bg_params,
	doc_style_border_params,
	doc_style_border_radius_params,
	doc_style_grid_params,
	doc_style_flex_params,
	doc_style_spacing_params,
	doc_style_size_params,
	doc_style_ff_params,
	doc_setting_element_params,
	doc_settings_params,
	doc_setting_swiper_params,
	doc_setting_timer_params,
	doc_setting_view_params,
	doc_setting_category_list_params,
	doc_setting_show_params,
	doc_version_params,
	doc_content_photo_params,
	doc_content_params,
	doc_content_video_params,
	doc_content_text_params,
	doc_content_link_params,
	doc_content_animation_params,
	doc_elements_params,
	doc_components_params,
	doc_category_list_params,
	doc_saint_laurent_container_params,
	doc_widget_params,
	doc_container_params,
};
