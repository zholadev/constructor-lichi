import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

type GenericObject = Record<string, any>;

/**
 * @author Zholaman Zhumanov
 * @description Метод обновление данных
 * @param obj
 * @param path
 * @param value
 * @param save
 */
export function updateObjectByPath(
	obj: GenericObject,
	path: string,
	value: any,
	save = false
): void {
	try {
		const keys = path?.split(".");
		let current = obj;

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!current[key]) {
				current[key] = {};
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];

		if (
			save &&
			typeof current[lastKey] === "object" &&
			current[lastKey] !== null
		) {
			current[lastKey] = { ...current[lastKey], ...value };
		} else {
			current[lastKey] = value;
		}
	} catch (error) {
		errorHandler("useEditorEvent", "updateObjectByPath", error);
	}
}

export function removeObjectByPath(obj: GenericObject, path: string): void {
	try {
		const keys = path?.split(".");
		let current = obj;

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!current[key]) {
				current[key] = {};
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];

		delete current[lastKey];
	} catch (error) {
		errorHandler("useEditorEvent", "updateObjectByPath", error);
	}
}

/**
 * @author Zholaman Zhumanov
 * @description Метод удаление
 * @param obj
 * @param path
 */
export function deleteObjectByPath(obj: GenericObject, path: string): void {
	const keys = path.split("."); // Разбиваем строку пути на массив ключей
	let current = obj;

	// Проходим по объекту, доходя до предпоследнего уровня
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < keys.length - 1; i++) {
		const key = keys[i];
		if (!current[key]) {
			return; // Если путь не существует, просто выходим
		}
		current = current[key]; // Переходим на следующий уровень
	}

	const lastKey = keys[keys.length - 1];

	// Проверяем, существует ли ключ
	if (current && current.hasOwnProperty(lastKey)) {
		delete current[lastKey]; // Удаляем ключ
	}
}

/**
 * @author Zholaman Zhumanov
 * @description Метод удаление несколько ключей
 * @param obj
 * @param paths
 */
export function deleteMultiplePaths(
	obj: GenericObject,
	paths?: string | string[]
): void {
	if (!paths) return;
	if (typeof paths === "string") {
		paths = [paths]; // Convert to an array if a single path is passed
	}
	paths.forEach((path) => {
		deleteObjectByPath(obj, path); // Delete each property by its path
	});
}

/**
 * @author Zholaman Zhumanov
 * @description Метод копирования объекта для мутации данных
 * @param obj
 */
export function deepCopy<T>(obj: T): T {
	return JSON.parse(JSON.stringify(obj));
}
