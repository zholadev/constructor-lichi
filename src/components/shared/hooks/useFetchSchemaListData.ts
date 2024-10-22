"use client";

import useApiRequest from "@/components/shared/hooks/useApiRequest";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { apiMethodSchemaListData } from "@/components/shared/backend/requests/schema/requests";
import { IRequestApiParams } from "@/components/shared/types/interface-app";

/**
 * @author Zholaman Zhumanov
 * @created 15.08.2024
 * @description Получаем список страниц
 */
export default function useFetchSchemaListData(): any {
	const { schemaListDataAction, schemaListApiLoadingAction } =
		useDispatchAction();

	const { apiFetchHandler } = useApiRequest();

	const { schemaListApiParamsPage } = useAppSelector(
		(state) => state.schemaList
	);

	return async (isLoading: boolean) => {
		if (isLoading) {
			schemaListApiLoadingAction(true);
		}
		await apiFetchHandler(
			apiMethodSchemaListData,
			false,
			{
				onGetData: (params: IRequestApiParams) => {
					if (params.success) {
						schemaListDataAction({
							data: params.data?.data,
							pagination: params.data?.pagination,
						});
					}
				},
			},
			[schemaListApiParamsPage]
		);

		schemaListApiLoadingAction(false);
	};
}
