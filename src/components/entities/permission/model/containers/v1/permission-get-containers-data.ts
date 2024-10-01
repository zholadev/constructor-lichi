import { IPermission } from "@/components/entities/permission/types/interface-permission";
import { TemplateBaseType } from "@/components/shared/types/interface-templates";
import {
	container_permission,
	swiper_container_permission,
} from "@/components/entities/permission/model/containers/v1/permission-container";

export const permissionGetContainersData = (
	type: TemplateBaseType
): IPermission | Record<string, never> => {
	switch (type) {
		case "container":
			return container_permission;
		case "swiper":
			return swiper_container_permission;
		default:
			return {};
	}
};
