import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import { basePermission } from "@/components/shared/hooks/usePermission";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { versionComponents } from "@/components/app/versions/types/interface-version-components";

// Универсальная функция для поиска разрешений по типу компонента и версии
const findComponentPermission = (
	versionsArray:
		| Array<{ version: string; permission: IPermission }>
		| undefined,
	versionComponent: string
): IPermission => {
	const foundVersion = versionsArray?.find(
		(version) => version.version === versionComponent
	);
	return foundVersion?.permission || basePermission;
};

/**
 * @author Zholaman Zhumanov
 * @description Данные ддя получения доступа для компонентов
 * @param type
 * @param versionComponent
 */
export const permissionGetComponents = (
	type: ComponentBaseTypes | ComponentSpecialTypes,
	versionComponent: string
): IPermission => {
	switch (type) {
		case "card":
			return findComponentPermission(
				versionComponents.card,
				versionComponent
			);
		case "card_outside":
			return findComponentPermission(
				versionComponents.card_outside,
				versionComponent
			);
		case "album":
			return findComponentPermission(
				versionComponents.album,
				versionComponent
			);
		case "album_outside":
			return findComponentPermission(
				versionComponents.album_outside,
				versionComponent
			);
		case "saint_laurent":
			return findComponentPermission(
				versionComponents.saint_laurent,
				versionComponent
			);
		default:
			return basePermission; // Если тип компонента не найден, возвращаем базовые разрешения
	}
};
