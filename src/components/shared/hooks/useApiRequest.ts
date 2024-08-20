"use client";

import { useState } from "react";
import { AxiosResponse } from "axios";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { errorData } from "@/components/shared/constants/text";
import useToastMessage from "./useToastMessage";

// interface ApiOptions {
// 	offLoader?: boolean;
// 	disableLoading?: boolean;
// 	onGetData?: (data: {
// 		data: any;
// 		errorFields?: any;
// 		success?: any;
// 		messages?: any[];
// 		totalData?: any;
// 	}) => void;
// }

// interface UseApiRequestReturn {
// 	apiFetchHandler: (
// 		apiFetchFunc: any,
// 		loader: (loading: boolean) => void,
// 		options: ApiOptions,
// 		params?: unknown[]
// 	) => Promise<any[]>;
// 	loading: boolean;
// }

/**
 * @author Zholaman Zhumanov
 * @name useApiRequest
 * @todo типизацию
 * @returns {{apiFetchHandler: ((function(*, []=, *, *): Promise<void>)|*), loading: boolean}}
 */
function useApiRequest(): any {
	const [loading, setLoading] = useState<boolean>(false);

	const toastMessage = useToastMessage();

	const handleErrorMessage = (messages: []) => {
		if (messages) {
			messages.map((item) => toastMessage(item, "error"));
		}
	};

	const apiFetchHandler = async (
		apiFetchFunc: any,
		loader: any,
		options: any,
		params: [] = []
	): Promise<any[] | any> => {
		try {
			setLoading(true);

			if (!options.offLoader) {
				if (loader) loader(true);
			}

			await apiFetchFunc(...params).then((res: AxiosResponse) => {
				const totalData = res;
				const resData = res?.data;

				const data = resData;
				const messages = resData?.api_messages;
				const success = resData?.api_success;
				const errorFields = resData?.error;

				handleErrorMessage(messages);

				options?.onGetData?.({
					data,
					errorFields,
					success,
					messages,
					totalData,
				});
			});

			if (!options.disableLoading) {
				if (loader) loader(true);
			}

			if (loader) loader(false);
			setLoading(false);

			return [];
		} catch (error) {
			if (error instanceof Error) {
				toastMessage(errorData, "error");
				errorHandler("useApiRequest", "api", error);
			} else {
				toastMessage(errorData, "error");
				errorHandler("useApiRequest", "api", error);
			}

			return [];
		}
	};

	return { apiFetchHandler, loading };
}

export default useApiRequest;
