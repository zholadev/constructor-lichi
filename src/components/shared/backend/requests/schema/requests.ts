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
	const formData = new FormData();
	return sendApiPostRequest(API.schema.langList, formData, "constructor_get");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список магазинов
 */
export const apiMethodSchemaListShops = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	const formData = new FormData();
	return sendApiPostRequest(API.schema.getShops, formData, "constructor_hp");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения список страниц
 */
export const apiMethodSchemaListData = async (
	page: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (page) {
		formData.append("page", page);
	}

	return sendApiPostRequest(API.schema.list, formData, "constructor_hp");
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
export const apiMethodSchemaGetById = async (
	id: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (id) {
		formData.append("id", id);
	}
	return sendApiPostRequest(API.schema.getById, formData, "constructor_hp");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для удаления страницы по ID
 */
export const apiMethodSchemaDelete = async (
	id: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (id) {
		formData.append("id", id);
	}
	return sendApiPostRequest(
		API.schema.deleteSchema,
		formData,
		"constructor_hp"
	);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для копирования страницы по ID
 */
export const apiMethodSchemaCopy = async (
	id: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (id) {
		formData.append("id", id);
	}
	return sendApiPostRequest(API.schema.copy, formData, "constructor_hp");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для создания новой страницы
 */
export const apiMethodSchemaCreate = async (
	name: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (name) {
		formData.append("name", name);
	}
	return sendApiPostRequest(API.schema.create, formData, "constructor_hp");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для активации страницы
 */
export const apiMethodSchemaSetActive = async (
	use: string[],
	id: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (use) {
		formData.append("use", JSON.stringify(use));
	}
	if (id) {
		formData.append("id", id);
	}
	return sendApiPostRequest(API.schema.setActive, formData, "constructor_hp");
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для обновление meta
 */
export const apiMethodSchemaUpdateMeta = async (
	name: string,
	id: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (name) {
		formData.append("name", name);
	}
	if (id) {
		formData.append("id", id);
	}
	return sendApiPostRequest(
		API.schema.updateMeta,
		formData,
		"constructor_hp"
	);
};
