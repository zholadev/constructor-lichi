import { IPermission } from "@/components/app/permission/types/interface-permission";
import { permissionBaseComponentsV1 } from "@/components/app/permission/model/components/v1/permission-base-components";

export const card_component_permission_v1: IPermission = {
	...permissionBaseComponentsV1,
	panel: {
		...permissionBaseComponentsV1.panel,
	},
	editor: {
		...permissionBaseComponentsV1.editor,
	},
	styles: {
		...permissionBaseComponentsV1.styles,
	},
	content: {
		...permissionBaseComponentsV1.content,
	},
	setting: {
		...permissionBaseComponentsV1.setting,
	},
};

export const card_outside_component_permission_v1: IPermission = {
	...permissionBaseComponentsV1,
	panel: {
		...permissionBaseComponentsV1.panel,
	},
	editor: {
		...permissionBaseComponentsV1.editor,
	},
	styles: {
		...permissionBaseComponentsV1.styles,
	},
	content: {
		...permissionBaseComponentsV1.content,
	},
	setting: {
		...permissionBaseComponentsV1.setting,
	},
};

export const album_component_permission_v1: IPermission = {
	...permissionBaseComponentsV1,
	panel: {
		...permissionBaseComponentsV1.panel,
	},
	editor: {
		...permissionBaseComponentsV1.editor,
	},
	styles: {
		...permissionBaseComponentsV1.styles,
	},
	content: {
		...permissionBaseComponentsV1.content,
	},
	setting: {
		...permissionBaseComponentsV1.setting,
	},
};

export const album_outside_component_permission_v1: IPermission = {
	...permissionBaseComponentsV1,
	panel: {
		...permissionBaseComponentsV1.panel,
	},
	editor: {
		...permissionBaseComponentsV1.editor,
	},
	styles: {
		...permissionBaseComponentsV1.styles,
	},
	content: {
		...permissionBaseComponentsV1.content,
	},
	setting: {
		...permissionBaseComponentsV1.setting,
	},
};
