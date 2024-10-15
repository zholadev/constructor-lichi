import { IContainerType } from "@/components/shared/types/types";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import {
	category_list_container_permission_v1,
	container_block_permission_v1,
	container_swiper_permission_v1,
	saint_laurent_container_block_permission_v1,
	saint_laurent_container_swiper_permission_v1,
} from "@/components/app/permission/model/containers/v1/permission-container";

interface IComponentsPermission {
	block?: IPermission;
	swiper?: IPermission;
}

interface IVersionComponentsPermission {
	version: string;
	permission: IComponentsPermission;
}

type IVersionContainer = Record<IContainerType, IVersionComponentsPermission[]>;

/**
 * @author Zholaman Zhumanov
 * @description Данные для получения по версионности с доступностью
 */
export const versionContainer: IVersionContainer = {
	container: [
		{
			version: "1.0",
			permission: {
				block: container_block_permission_v1,
				swiper: container_swiper_permission_v1,
			},
		},
	],
	saint_laurent_container: [
		{
			version: "1.0",
			permission: {
				block: saint_laurent_container_block_permission_v1,
				swiper: saint_laurent_container_swiper_permission_v1,
			},
		},
	],
	category_list_container: [
		{
			version: "1.0",
			permission: {
				swiper: category_list_container_permission_v1,
			},
		},
	],
	initial: [
		{
			version: "1.0",
			permission: {},
		},
	],
};
