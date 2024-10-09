import { IContainerType } from "@/components/shared/types/types";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import {
	category_list_container_permission_v1,
	container_permission_v1,
	saint_laurent_container_permission_v1,
	swiper_container_permission_v1,
} from "@/components/app/permission/model/containers/v1/permission-container";

type IVersionComponentsPermission = Record<"permission", IPermission | false>;
type IVersionContainer = Record<
	IContainerType,
	Array<Record<"version", string> & IVersionComponentsPermission>
>;

export const versionContainer: IVersionContainer = {
	container: [
		{
			version: "1.0",
			permission: container_permission_v1,
		},
	],
	saint_laurent_container: [
		{
			version: "1.0",
			permission: saint_laurent_container_permission_v1,
		},
	],
	category_list_container: [
		{
			version: "1.0",
			permission: category_list_container_permission_v1,
		},
	],
	swiper: [
		{
			version: "1.0",
			permission: swiper_container_permission_v1,
		},
	],
	initial: [
		{
			version: "1.0",
			permission: false,
		},
	],
};
