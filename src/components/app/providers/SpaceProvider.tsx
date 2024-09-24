"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSchemaGetById } from "@/components/shared/backend/requests/schema/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

interface Props {
	children: React.ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const SpaceProvider: React.FC<Props> = (props) => {
	const { children } = props;

	const { apiFetchHandler } = useApiRequest();

	const toastMessage = useToastMessage();

	const searchQuery = useSearchParams();

	const {
		spaceTemplatePageIdAction,
		spaceModeTemplateTypeAction,
		spaceTemplateDataAction,
		spaceTemplateApiLoadingAction,
		spaceModeDeviceTypeAction,
		spaceModePlatformTypeAction,
		spaceTemplateActionDataAction,
		spaceTemplateSchemaDevicesDataAction,
	} = useDispatchAction();

	const getPlatformQuery = searchQuery.get("platform");
	const getPageIdQuery = searchQuery.get("page_id");

	const {
		spaceTemplateData,
		spaceModeTheme,
		spaceModeLanguage,
		spaceModePreviewShop,
		spaceModeDeviceType,
		spaceModeDeviceFrame,
		spaceModeTemplateType,
		spaceModePlatformType,
		spaceTemplatePageId,
		spaceTemplateSchemaDevicesData,
	} = useAppSelector((state) => state.space);

	console.log(
		"spaceModeDeviceType",
		spaceModeDeviceType,
		spaceTemplateSchemaDevicesData
	);

	const fetchGetPageById = async () => {
		await apiFetchHandler(
			apiMethodSchemaGetById,
			spaceTemplateApiLoadingAction,
			{
				onGetData: (params: IGetApiParams) => {
					if (params.success) {
						// spaceTemplateDataAction(params.data?.page);
						spaceTemplateActionDataAction(params.data?.page);
					}
				},
			},
			[spaceTemplatePageId]
		);
	};

	useEffect(() => {
		if (!spaceTemplatePageId) return;
		fetchGetPageById();
	}, [spaceTemplatePageId]);

	useEffect(() => {
		if (!spaceTemplateData) {
			return;
		}
		if (!spaceModeDeviceType) {
			toastMessage("Ошибка! Выберите устройство!", "error");
			return;
		}

		if (
			spaceModeDeviceType === "desktop" ||
			spaceModeDeviceType === "laptop"
		) {
			spaceTemplateSchemaDevicesDataAction("desktop", spaceTemplateData);
		} else if (spaceModeDeviceType === "tablet") {
			spaceTemplateSchemaDevicesDataAction("tablet", spaceTemplateData);
		} else if (spaceModeDeviceType === "mobile") {
			spaceTemplateSchemaDevicesDataAction("mobile", spaceTemplateData);
		}

		// if (
		// 	spaceModeDeviceType === "desktop" ||
		// 	spaceModeDeviceType === "laptop"
		// ) {
		// 	spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.desktop);
		// } else if (spaceModeDeviceType === "tablet") {
		// 	spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.tablet);
		// } else if (spaceModeDeviceType === "mobile") {
		// 	spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.mobile);
		// }
	}, [
		spaceTemplateData,
		spaceModeDeviceType,
		spaceTemplateSchemaDevicesData,
	]);

	useEffect(() => {
		if (!spaceModeDeviceType) {
			if (getPlatformQuery === "browser") {
				spaceModeDeviceTypeAction("desktop");
			} else if (getPlatformQuery === "app") {
				spaceModeDeviceTypeAction("mobile");
			}
		}
	}, [spaceModeDeviceType, getPlatformQuery]);
	/**
	 * @author Zholaman Zhumanov
	 * @description Настройки нужных данных
	 */
	useEffect(() => {
		if (!spaceTemplatePageId && getPageIdQuery) {
			spaceTemplatePageIdAction(getPageIdQuery);
		}

		if (!spaceModePlatformType && getPlatformQuery) {
			spaceModePlatformTypeAction(getPlatformQuery);
		}
	}, [
		spaceTemplatePageId,
		spaceModePlatformType,
		getPageIdQuery,
		getPlatformQuery,
	]);

	return children;
};

export default SpaceProvider;
