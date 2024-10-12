import { basePermission } from "@/components/shared/hooks/usePermission";
import {
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { versionContainer } from "@/components/app/versions/types/interface-version-container";

export const permissionGetContainersData = (
	type: IContainerType,
	displayBlock: DisplayContainerType,
	versionComponent: string
): IPermission => {
	switch (type) {
		case "container":
			const findContainer = versionContainer.container?.find(
				(version) => version.version === versionComponent
			);
			return <IPermission>findContainer?.permission;
		case "swiper":
			const findContainerSwiper = versionContainer.swiper?.find(
				(version) => version.version === versionComponent
			);
			return <IPermission>findContainerSwiper?.permission;
		case "saint_laurent_container":
			const findSaintLaurent =
				versionContainer.saint_laurent_container?.find(
					(version) => version.version === versionComponent
				);
			return <IPermission>findSaintLaurent?.permission;
		case "category_list_container":
			const findCategoryList =
				versionContainer.category_list_container?.find(
					(version) => version.version === versionComponent
				);
			return <IPermission>findCategoryList?.permission;
		default:
			return basePermission;
	}
};
