import { ComponentSpecialTypes } from "@/components/shared/types/types-components";
import { IPermission } from "@/components/entities/permission/types/interface-permission";
import { basePermission } from "@/components/shared/hooks/usePermission";
import { saint_laurent_component_permission } from "@/components/features/app/ui/components/permission/permission-special-components";

export const permissionGetSpecialComponents = (
	type: ComponentSpecialTypes
): IPermission => {
	switch (type) {
		case "saint_laurent":
			return saint_laurent_component_permission;
		default:
			return basePermission;
	}
};
