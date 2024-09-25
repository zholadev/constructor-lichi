import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { IPermission } from "@/components/entities/permission/interface-permission";
import {
	button_component_permission,
	text_component_permission,
	timer_component_permission,
} from "@/components/features/app/elements/permission/permission-element";

export const getElementPermissionData = (
	type: ElementBaseTypes
): IPermission | Record<string, never> => {
	switch (type) {
		case "button":
			return button_component_permission;
		case "text":
			return text_component_permission;
		case "timer":
			return timer_component_permission;
		default:
			return {};
	}
};
