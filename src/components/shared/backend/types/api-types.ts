import { AxiosError } from "axios";

export interface Params {
	[key: string]: unknown;
}

export interface ResponseObject {
	success: boolean;
	error?: string;
	data?: any;
	status?: number;
	message_fail: string;
	code: AxiosError;
}

export type ThemeType = "light" | "dark" | "system";
