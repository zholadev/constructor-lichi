import { IPermission } from "@/components/entities/permission/types/interface-permission";
import { permissionSpecialComponents } from "@/components/entities/permission/model/components/v1/permission-special-components";

export const saint_laurent_component_permission: IPermission = {
	...permissionSpecialComponents,
	panel: {
		...permissionSpecialComponents.panel,
	},
	editor: {
		...permissionSpecialComponents.editor,
	},
	styles: {
		...permissionSpecialComponents.styles,
	},
	content: {
		...permissionSpecialComponents.content,
	},
	setting: {
		...permissionSpecialComponents.setting,
	},
};
