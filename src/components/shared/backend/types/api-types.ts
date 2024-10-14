import { AxiosError } from "axios";

export interface ResponseObject {
	success: boolean;
	error?: string;
	data?: any;
	status?: number;
	message_fail: string;
	code: AxiosError;
}
