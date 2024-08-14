import { AxiosResponse } from "axios";
import { API } from "../../api/api";
import { ResponseObject } from "../../types/api-types";
import { sendApiPostRequest } from "../../instance/instance";

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список языков
 */
export const apiMethodSchemaLangList = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.langList);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список магазинов
 */
export const apiMethodSchemaListShops = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.getShops);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список страниц
 */
export const apiMethodSchemaListSchema = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.list);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для сохранения страницы
 */
export const apiMethodSchemaSave = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.saveSchema);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения страницы по ID
 */
export const apiMethodSchemaGetById = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.getById);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для удаления страницы по ID
 */
export const apiMethodSchemaDelete = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.deleteSchema);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для копирования страницы по ID
 */
export const apiMethodSchemaCopy = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.copy);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для создания новой страницы
 */
export const apiMethodSchemaCreate = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.create);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для активации страницы
 */
export const apiMethodSchemaSetActive = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.setActive);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для обновление meta
 */
export const apiMethodSchemaUpdateMeta = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.schema.updateMeta);
};
