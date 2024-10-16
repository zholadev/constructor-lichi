import { SchemaComponentTypes } from "@/components/shared/types/types-components";
import {
	album_component_permission_v1,
	album_outside_component_permission_v1,
	card_component_permission_v1,
	card_outside_component_permission_v1,
} from "@/components/features/app/modules/components/permission/v1/permission-component";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { saint_laurent_component_permission_v1 } from "@/components/features/app/modules/components/permission/v1/permission-special-components";

type IVersionComponentsPermission = Record<"permission", IPermission>;
type IVersionComponents = Record<
	SchemaComponentTypes,
	Array<Record<"version", string> & IVersionComponentsPermission>
>;

export const versionComponents: IVersionComponents = {
	card: [
		{
			version: "1.0",
			permission: card_component_permission_v1,
		},
	],
	card_outside: [
		{
			version: "1.0",
			permission: card_outside_component_permission_v1,
		},
	],
	album: [
		{
			version: "1.0",
			permission: album_component_permission_v1,
		},
	],
	album_outside: [
	{
			version: "1.0",
			permission: album_outside_component_permission_v1,
		},
	],
	saint_laurent: [
		{
			version: "1.0",
			permission: saint_laurent_component_permission_v1,
		},
	],
	none: [
		{
			version: "1.0",
			permission: {},
		},
	],
};
