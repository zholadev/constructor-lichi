"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { apiMethodSchemaGetById } from "@/components/shared/backend/requests/schema/requests";
import { IGetApiParams } from "@/components/shared/types/interface";

interface Props {
	children: React.ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpaceProvider: React.FC<Props> = (props) => {
	const { children } = props;

	const { apiFetchHandler } = useApiRequest();

	const searchQuery = useSearchParams();

	const {
		spaceTemplatePageIdAction,
		spaceModeTemplateTypeAction,
		spaceTemplateDataAction,
		spaceTemplateApiLoadingAction,
		spaceModeDeviceTypeAction,
		spaceModePlatformTypeAction,
		spaceTemplateActionDataAction,
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
	} = useAppSelector((state) => state.space);

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
