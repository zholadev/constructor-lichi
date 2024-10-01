import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { IPermission } from "@/components/entities/permission/types/interface-permission";
import {
	button_component_permission,
	text_component_permission,
	timer_component_permission,
} from "@/components/features/app/ui/elements/permission/permission-element";
import { basePermission } from "@/components/shared/hooks/usePermission";

export const permissionGetElementsData = (
	type: ElementBaseTypes
): IPermission => {
	switch (type) {
		case "button":
			return button_component_permission;
		case "text":
			return text_component_permission;
		case "timer":
			return timer_component_permission;
		default:
			return basePermission;
	}
};
