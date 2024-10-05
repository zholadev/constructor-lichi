import { IPermission } from "@/components/app/permission/types/interface-permission";
import { permissionBaseElements } from "@/components/app/permission/model/elements/v1/permission-base-elements";

export const button_component_permission: IPermission = {
	...permissionBaseElements,
	panel: {
		...permissionBaseElements.panel,
	},
	editor: {
		...permissionBaseElements.editor,
	},
	styles: {
		...permissionBaseElements.styles,
	},
	content: {
		...permissionBaseElements.content,
	},
	setting: {
		...permissionBaseElements.setting,
	},
};

export const text_component_permission: IPermission = {
	...permissionBaseElements,
	panel: {
		...permissionBaseElements.panel,
	},
	editor: {
		...permissionBaseElements.editor,
	},
	styles: {
		...permissionBaseElements.styles,
	},
	content: {
		...permissionBaseElements.content,
		link: false,
	},
	setting: {
		...permissionBaseElements.setting,
	},
};

export const timer_component_permission: IPermission = {
	...permissionBaseElements,
	panel: {
		...permissionBaseElements.panel,
	},
	editor: {
		...permissionBaseElements.editor,
	},
	styles: {
		...permissionBaseElements.styles,
	},
	content: {
		...permissionBaseElements.content,
		textFill: false,
	},
	setting: {
		...permissionBaseElements.setting,
		timer: true,
	},
};
