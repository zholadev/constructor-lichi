import { IPermission } from "@/components/app/permission/types/interface-permission";
import { permissionSpecialComponentsV1 } from "@/components/app/permission/model/components/v1/permission-special-components";

export const saint_laurent_component_permission_v1: IPermission = {
	...permissionSpecialComponentsV1,
	panel: {
		...permissionSpecialComponentsV1.panel,
	},
	editor: {
		...permissionSpecialComponentsV1.editor,
	},
	styles: {
		...permissionSpecialComponentsV1.styles,
	},
	content: {
		...permissionSpecialComponentsV1.content,
	},
	setting: {
		...permissionSpecialComponentsV1.setting,
	},
};
