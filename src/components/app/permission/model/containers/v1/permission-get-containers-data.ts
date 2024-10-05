import { basePermission } from "@/components/shared/hooks/usePermission";
import { IContainerType } from "@/components/shared/types/types";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import {
	category_list_container_permission,
	container_permission,
	saint_laurent_container_permission,
	swiper_container_permission,
} from "@/components/app/permission/model/containers/v1/permission-container";

export const permissionGetContainersData = (
	type: IContainerType
): IPermission => {
	switch (type) {
		case "container":
			return container_permission;
		case "swiper":
			return swiper_container_permission;
		case "saint_laurent_container":
			return saint_laurent_container_permission;
		case "category_list_container":
			return category_list_container_permission;
		default:
			return basePermission;
	}
};
