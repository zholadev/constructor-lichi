import { AxiosResponse } from "axios";
import { API } from "../../api/api";
import { ResponseObject } from "../../types/api-types";
import { sendApiPostRequest } from "../../instance/instance";

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения структуру папок
 */
export const apiMethodTree = async (): Promise<
	AxiosResponse | ResponseObject
> => {
	return sendApiPostRequest(API.file.tree);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для получения картинок
 */
export const apiMethodGet = async (
	path: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (path) {
		formData.append("path", path);
	}

	return sendApiPostRequest(API.file.get, formData);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для загрузки картинки
 */
export const apiMethodUploadFile = async (
	files: File[],
	path: string
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (path) {
		formData.append("path", path);
	}

	files.forEach((file) => {
		formData.append("file", file);
	});

	return sendApiPostRequest(API.file.uploadFile, formData);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для создание папки
 */
export const apiMethodCreateDir = async (params: {
	name: "string";
	path: "string";
}): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (params.name) {
		formData.append("name", params.name);
	}
	if (params.path) {
		formData.append("path", params.path);
	}

	return sendApiPostRequest(API.file.createDir, formData);
};

/**
 * @author Zholaman Zhumanov
 * @created 14.08.2024
 * @description Метод для удаления файла или папки
 */

interface IRemoveParams {
	type: string;
	object: string;
}

export const apiMethodRemove = async (
	params: IRemoveParams
): Promise<AxiosResponse | ResponseObject> => {
	const formData = new FormData();

	if (params.type) {
		formData.append("type", params.type);
	}

	if (params.object) {
		formData.append("object", params.object);
	}

	return sendApiPostRequest(API.file.remove, formData);
};
