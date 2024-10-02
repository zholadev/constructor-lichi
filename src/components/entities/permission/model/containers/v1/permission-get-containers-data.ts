import { IPermission } from "@/components/entities/permission/types/interface-permission";
import {
	container_permission,
	saint_laurent_container_permission,
	swiper_container_permission,
} from "@/components/entities/permission/model/containers/v1/permission-container";
import { basePermission } from "@/components/shared/hooks/usePermission";
import { IContainerType } from "@/components/shared/types/types";

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
		default:
			return basePermission;
	}
};
