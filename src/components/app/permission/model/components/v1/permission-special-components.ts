import { IPermission } from "@/components/app/permission/types/interface-permission";

export const permissionSpecialComponentsV1: IPermission = {
	panel: {
		styles: true,
		content: true,
		setting: true,
		component: true,
		element: true,
		navigator: true,
	},
	editor: {
		remove: false,
		dnd: false,
		add: false,
	},
	styles: {
		fill: {
			root: true,
			backgroundColor: true,
		},
		border: {
			root: true,
			border: true,
			radius: true,
		},
		size: {
			root: true,
			width: true,
			height: true,
		},
		spacing: {
			padding: true,
			margin: true,
			root: true,
		},
		position: {
			justifyContent: true,
			alignItems: true,
			root: true,
		},
		typography: {
			root: true,
			fontSize: true,
			fontFamily: true,
			color: true,
			fontStyle: true,
			fontWeight: true,
			textAlign: true,
		},
		grid: {
			root: false,
			gap: false,
		},
	},
	content: {
		image: true,
		video: true,
		link: true,
		textFill: false,
		stories: true,
	},
	setting: {
		show: {
			root: false,
			siteType: false,
		},
		view: {
			root: true,
			contentType: true,
			navbarMode: false,
			heightFull: false,
			darkTheme: true,
		},
		action: {
			root: true,
			add: false,
			remove: true,
		},
		swiper: {
			root: false,
		},
		element: true,
		timer: false,
	},
};
