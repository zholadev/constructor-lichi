import { basePermission } from "@/components/shared/hooks/usePermission";
import {
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { versionContainer } from "@/components/app/versions/types/interface-version-container";

// Универсальная функция для поиска разрешений контейнера
const findContainerPermission = (
	versionsArray:
		| Array<{
				version: string;
				permission: { block?: IPermission; swiper?: IPermission };
		  }>
		| undefined,
	displayBlock: DisplayContainerType,
	versionComponent: string
): IPermission => {
	const foundContainer = versionsArray?.find(
		(version) => version.version === versionComponent
	);

	if (displayBlock === "swiper") {
		return foundContainer?.permission.swiper || basePermission;
	}
	return foundContainer?.permission.block || basePermission;
};

/**
 * @author Zholaman Zhumanov
 * @description Данные для получения доступности для контейнеров
 * @param type
 * @param displayBlock
 * @param versionComponent
 */
export const permissionGetContainers = (
	type: IContainerType,
	displayBlock: DisplayContainerType,
	versionComponent: string
): IPermission => {
	switch (type) {
		case "container":
			return findContainerPermission(
				versionContainer.container,
				displayBlock,
				versionComponent
			);
		case "saint_laurent_container":
			return findContainerPermission(
				versionContainer.saint_laurent_container,
				displayBlock,
				versionComponent
			);
		case "category_list_container":
			return findContainerPermission(
				versionContainer.category_list_container,
				displayBlock,
				versionComponent
			);
		default:
			return basePermission;
	}
};
