"use client";

import axios, { AxiosInstance, AxiosResponse } from "axios";
import { errorInstance } from "../error/error-instance";
import { ResponseObject } from "../types/api-types";

/**
 * @todo refactoring global base url
 */

/**
 * @author Zholaman Zhumanov
 * @description Настройки axios
 * @type {AxiosInstance}
 */
const axiosInstance: AxiosInstance = axios.create({
	baseURL: "https://app3.lichishop.com/api/",
	withCredentials: false,
	// headers: {
	// 	"User-Agent":
	// 		"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
	// },
	timeout: 5000,
});

export async function sendApiPostRequest(
	url: string,
	formDataAdd?: FormData,
	do_type: string = "constructor_fm"
): Promise<AxiosResponse | ResponseObject> {
	try {
		let formData = new FormData();

		if (formDataAdd) {
			formDataAdd.forEach((value, key) => {
				formData.append(key, value);
			});
		}

		formData.append("app", "site_admin");
		formData.append("do", `${do_type}${url}`);
		formData.append(
			"USER_DATA",
			"S3sRASJrGAt0e3ZzTFF2CWEbbw15HwcTIzkOChJjDDAfPSJtEgQAbnh7fnABC3Z2CW95aEIHdQ5sDHMdBC06YVVNIScFbl5nECxzcBIx"
		);

		return await axiosInstance.post("", formData);
	} catch (error) {
		if (error instanceof Error) {
			return errorInstance(error, url);
		}
		return errorInstance(error, url);
	}
}
