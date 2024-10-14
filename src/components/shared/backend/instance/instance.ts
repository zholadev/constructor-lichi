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
	baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
	withCredentials: false,
	timeout: 5000,
});

const axiosInstanceSite: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_SITE_API_URL,
	withCredentials: false,
	timeout: 5000,
});
const axiosInstanceBitrix: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_BITRIX_API_URL,
	withCredentials: false,
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
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
		return errorInstance(error, url);
	}
}

export async function sendApiSitePostRequest(
	url: string,
	params = {}
): Promise<AxiosResponse | ResponseObject> {
	try {
		let apiDataConfig = {
			__v: 2.0,
			platform: "browser",
			...params,
		};

		return await axiosInstanceSite.post(url, apiDataConfig, {
			params: {
				...params,
			},
		});
	} catch (error) {
		return errorInstance(error, url);
	}
}

export async function sendApiBitrixPostRequest(
	url: string,
	params = {}
): Promise<AxiosResponse | ResponseObject> {
	try {
		let apiDataConfig = {
			...params,
		};

		return await axiosInstanceBitrix.post(url, apiDataConfig, {
			params: {
				...params,
			},
		});
	} catch (error) {
		return errorInstance(error, url);
	}
}
