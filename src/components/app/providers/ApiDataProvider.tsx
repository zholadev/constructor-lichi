"use client";

import React, { useEffect } from "react";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodSchemaLangList,
	apiMethodSchemaListShops,
} from "@/components/shared/backend/requests/schema/requests";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
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
 * @todo removed ts-ignore
 * @fixme
 * @param props
 * @constructor
 */
const ApiDataProvider: React.FC<Props> = (props) => {
	const { children } = props;

	const { languageDataAction, shopsDataAction } = useDispatchAction();
	const { apiFetchHandler } = useApiRequest();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения список языков
	 */
	const fetchLangList = async () => {
		await apiFetchHandler(apiMethodSchemaLangList, false, {
			onGetData: (params: IRequestApiParams) => {
				if (params.success) {
					// @ts-ignore
					languageDataAction(params.data?.list);
				}
			},
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения список магазинов
	 */
	const fetchListShops = async () => {
		await apiFetchHandler(apiMethodSchemaListShops, false, {
			onGetData: (params: IRequestApiParams) => {
				if (params.success) {
					// @ts-ignore
					shopsDataAction(params.data?.list);
				}
			},
		});
	};

	const getCallAllMethods = async () => {
		await Promise.all([fetchLangList(), fetchListShops()]);
	};

	useEffect(() => {
		getCallAllMethods();
	}, []);

	return children;
};

export default ApiDataProvider;
