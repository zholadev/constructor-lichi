import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import {
	album_component_permission,
	album_outside_component_permission,
	card_component_permission,
	card_outside_component_permission,
	video_component_permission,
	video_outside_component_permission,
} from "@/components/features/app/modules/components/permission/v1/permission-component";
import { basePermission } from "@/components/shared/hooks/usePermission";
import { saint_laurent_component_permission } from "@/components/features/app/modules/components/permission/v1/permission-special-components";
import { IPermission } from "@/components/app/permission/types/interface-permission";

export const permissionGetBaseComponents = (
	type: ComponentBaseTypes | ComponentSpecialTypes
): IPermission => {
	switch (type) {
		case "card":
			return card_component_permission;
		case "card_outside":
			return card_outside_component_permission;
		case "album":
			return album_component_permission;
		case "album_outside":
			return album_outside_component_permission;
		case "video":
			return video_component_permission;
		case "video_outside":
			return video_outside_component_permission;
		case "saint_laurent":
			return saint_laurent_component_permission;
		default:
			return basePermission;
	}
};
