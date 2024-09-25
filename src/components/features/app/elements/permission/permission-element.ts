import { IPermission } from "@/components/entities/permission/interface-permission";
import { basePermissionElement } from "@/components/entities/permission/base-permission-element";

export const button_component_permission: IPermission = {
	...basePermissionElement,
	panel: {
		...basePermissionElement.panel,
	},
	editor: {
		...basePermissionElement.editor,
	},
	styles: {
		...basePermissionElement.styles,
	},
	content: {
		...basePermissionElement.content,
	},
	setting: {
		...basePermissionElement.setting,
	},
};

export const text_component_permission: IPermission = {
	...basePermissionElement,
	panel: {
		...basePermissionElement.panel,
	},
	editor: {
		...basePermissionElement.editor,
	},
	styles: {
		...basePermissionElement.styles,
	},
	content: {
		...basePermissionElement.content,
	},
	setting: {
		...basePermissionElement.setting,
	},
};

export const timer_component_permission: IPermission = {
	...basePermissionElement,
	panel: {
		...basePermissionElement.panel,
	},
	editor: {
		...basePermissionElement.editor,
	},
	styles: {
		...basePermissionElement.styles,
	},
	content: {
		...basePermissionElement.content,
	},
	setting: {
		...basePermissionElement.setting,
	},
};
