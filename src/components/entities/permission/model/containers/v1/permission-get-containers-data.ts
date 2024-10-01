import { IPermission } from "@/components/entities/permission/types/interface-permission";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import {
	container_permission,
	swiper_container_permission,
} from "@/components/entities/permission/model/containers/v1/permission-container";
import { basePermission } from "@/components/shared/hooks/usePermission";

export const permissionGetContainersData = (
	type: TemplateBaseType
): IPermission => {
	switch (type) {
		case "container":
			return container_permission;
		case "swiper":
			return swiper_container_permission;
		default:
			return basePermission;
	}
};
