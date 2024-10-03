import { IPermission } from "@/components/entities/permission/types/interface-permission";

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
		textFill: false,
		stories: false,
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
			darkTheme: true,
		},
		action: {
			root: true,
			add: true,
			remove: true,
		},
		swiper: {
			root: false,
		},
		timer: false,
		element: false,
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

export const swiper_container_permission: IPermission = {
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
		swiper: {
			root: true,
		},
	},
};

export const saint_laurent_container_permission: IPermission = {
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
		action: {
			...baseContainerPermission.setting.action,
			add: false,
		},
	},
};

export const category_list_container_permission: IPermission = {
	...baseContainerPermission,
	panel: {
		...baseContainerPermission.panel,
	},
	editor: {
		...baseContainerPermission.editor,
	},
	styles: {
		...baseContainerPermission.styles,
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
		...baseContainerPermission.content,
	},
	setting: {
		...baseContainerPermission.setting,
		swiper: {
			root: true,
		},
		action: {
			root: true,
			remove: true,
			add: false,
		},
		categoryList: true,
	},
};
