import { IPermission } from "@/components/entities/permission/interface-permission";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import { container_permission } from "@/components/entities/permission/permission-container";

export const getContainerPermissionData = (
	type: TemplateBaseType
): IPermission | Record<string, never> => {
	switch (type) {
		case "container":
			return container_permission;
		default:
			return {};
	}
};
