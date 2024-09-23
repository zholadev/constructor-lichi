"use client";

import React, { useEffect } from "react";
import useApiRequest from "@/components/shared/hooks/useApiRequest";
import {
	apiMethodSchemaLangList,
	apiMethodSchemaListShops,
} from "@/components/shared/backend/requests/schema/requests";
import { IGetApiParams } from "@/components/shared/types/interface";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

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
			onGetData: (params: IGetApiParams) => {
				if (params.success) {
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
			onGetData: (params: IGetApiParams) => {
				if (params.success) {
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
