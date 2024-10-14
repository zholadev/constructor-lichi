"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSchemaGetById } from "@/components/shared/backend/requests/schema/requests";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { IRequestApiParams } from "@/components/shared/types/interface-app";

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
		spaceModeDeviceType,
		spaceModePlatformType,
		spaceTemplatePageId,
		spaceTemplateSchemaDevicesData,
	} = useAppSelector((state) => state.space);

	const fetchGetPageById = async () => {
		await apiFetchHandler(
			apiMethodSchemaGetById,
			spaceTemplateApiLoadingAction,
			{
				onGetData: (params: IRequestApiParams) => {
					if (params.success) {
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
