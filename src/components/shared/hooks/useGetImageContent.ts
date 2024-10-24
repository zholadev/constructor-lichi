import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	ISchemaContentPhoto,
	ISchemaContentPhotoData,
} from "@/components/shared/types/interface-schema-content";
import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { DeviceType } from "@/components/shared/types/types";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

/**
 * @author Zholaman Zhumanov
 * @created 27.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useGetImageContent(
	imageData: ISchemaContentPhoto | null
): ISchemaContentPhotoData | null {
	const toastMessage = useToastMessage();

	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	const typeDeviceForImage: DeviceType = useMemo(() => {
		switch (spaceModeDeviceType) {
			case "desktop":
			case "laptop":
				return "desktop";
			case "tablet":
				return "tablet";
			case "mobile":
				return "mobile";
			default:
				return "desktop";
		}
	}, [spaceModeDeviceType]);

	return useMemo((): ISchemaContentPhotoData | null => {
		try {
			if (!imageData) return null;
			return imageData.photo?.[typeDeviceForImage];
		} catch (error) {
			toastMessage(
				"Произошла ошибка в useGetImageContent, обратитесь разработчику",
				"error"
			);
			return errorHandler("useGetImageContent", "root", error);
		}
	}, [imageData]);
}
