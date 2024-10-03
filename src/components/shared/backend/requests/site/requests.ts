import { AxiosResponse } from "axios";
import { API } from "../../api/api";
import { ResponseObject } from "../../types/api-types";
import { sendApiSitePostRequest } from "../../instance/instance";

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список языков и стран
 */
export const apiMethodSiteSiteInfo = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiSitePostRequest(API.site.siteInfo);
};

/**
 * @author Zholaman Zhumanov
 * @description Метод для получения список категорий
 * @param shop
 */
export const apiMethodSiteCategoryList = async (
	shop: number
): Promise<AxiosResponse | ResponseObject> => {
	return sendApiSitePostRequest(API.site.categoryList, {
		product_count: 8,
		product_new_count: 8,
		shop,
		lang: 1,
	});
};

/**
 * @author Zholaman Zhumanov
 * @description Метод для получения список товаров
 * @param category
 * @param limit
 * @param shop
 */
export const apiMethodSiteCategoryProductList = async (
	category: string,
	limit: number = 11,
	shop: number = 1
): Promise<AxiosResponse | ResponseObject> => {
	return sendApiSitePostRequest(API.site.categoryProductList, {
		shop,
		category,
		limit,
		lang: 1,
	});
};
