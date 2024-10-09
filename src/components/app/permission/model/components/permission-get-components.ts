import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import { basePermission } from "@/components/shared/hooks/usePermission";
import { IPermission } from "@/components/app/permission/types/interface-permission";
import { versionComponents } from "@/components/app/versions/types/interface-version-components";

export const permissionGetComponents = (
	type: ComponentBaseTypes | ComponentSpecialTypes,
	versionComponent: string
): IPermission => {
	switch (type) {
		case "card":
			const findComponentCard = versionComponents.card?.find(
				(version) => version.version === versionComponent
			);
			return <IPermission>findComponentCard?.permission;
		case "card_outside":
			const findComponentCardOutside =
				versionComponents.card_outside?.find(
					(version) => version.version === versionComponent
				);
			return <IPermission>findComponentCardOutside?.permission;
		case "album":
			const findComponentAlbum = versionComponents.album?.find(
				(version) => version.version === versionComponent
			);
			return <IPermission>findComponentAlbum?.permission;
		case "album_outside":
			const findComponentAlbumOutside =
				versionComponents.album_outside?.find(
					(version) => version.version === versionComponent
				);
			return <IPermission>findComponentAlbumOutside?.permission;
		case "saint_laurent":
			const findComponentSaintLaurent =
				versionComponents.saint_laurent?.find(
					(version) => version.version === versionComponent
				);
			return <IPermission>findComponentSaintLaurent?.permission;
		default:
			return basePermission;
	}
};
