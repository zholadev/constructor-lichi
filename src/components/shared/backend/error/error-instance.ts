import { ResponseObject } from "../types/api-types";

export const errorInstance = (
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	error: any,
	url: string
): ResponseObject => {
	if (error?.response) {
		const status = error?.response?.status;
		if (error.code === "ECONNABORTED") {
			console.error("Timeout error: ", error.message);
		} else if (status === 404) {
			console.error("Page not found: ", error?.message);
			console.error("url", url);
		} else if (status === 403) {
			console.error("Access is denied: ", error?.message);
			console.error("url", url);
		} else {
			console.error("Page not found: ", error?.message);
			console.error("url", url);
		}

		return {
			success: false,
			data: error.response?.data,
			error: error?.message,
			code: error?.code,
			status,
			message_fail:
				"An error occurred, please reload the page or contact support",
		};
	}
	return {
		success: false,
		error: error?.message,
		data: error?.response?.data,
		status: error?.response?.status,
		code: error?.code,
		message_fail:
			"An error occurred, please reload the page or contact support",
	};
};
