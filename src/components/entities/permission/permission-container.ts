import { IPermission } from "@/components/entities/permission/interface-permission";

export const baseContainerPermission: IPermission = {
	panel: {
		styles: true,
		content: false,
		setting: true,
		component: true,
		element: true,
		navigator: true,
	},
	editor: {
		remove: true,
		dnd: true,
		add: true,
	},
	styles: {
		fill: {
			root: false,
			backgroundColor: false,
		},
		border: {
			root: false,
			border: false,
			radius: false,
		},
		size: {
			root: false,
			width: false,
			height: false,
		},
		spacing: {
			padding: true,
			margin: true,
			root: true,
		},
		position: {
			justifyContent: false,
			alignItems: false,
			root: false,
		},
		typography: {
			root: false,
			fontSize: false,
			fontFamily: false,
			color: false,
			fontStyle: false,
			fontWeight: false,
			textAlign: false,
		},
		grid: {
			root: true,
			gap: true,
		},
	},
	content: {
		image: false,
		video: false,
		link: false,
	},
	setting: {
		show: {
			root: true,
			siteType: true,
		},
		view: {
			root: true,
			contentType: false,
			navbarMode: true,
			heightFull: true,
		},
		action: {
			root: true,
			add: true,
			remove: true,
		},
		swiper: {
			root: false,
		},
	},
};

export const container_permission: IPermission = {
	...baseContainerPermission,
	panel: {
		...baseContainerPermission.panel,
	},
	editor: {
		...baseContainerPermission.editor,
	},
	styles: {
		...baseContainerPermission.styles,
	},
	content: {
		...baseContainerPermission.content,
	},
	setting: {
		...baseContainerPermission.setting,
	},
};
