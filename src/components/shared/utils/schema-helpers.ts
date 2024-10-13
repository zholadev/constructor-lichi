import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

type GenericObject = Record<string, any>;

/**
 * @author Zholaman Zhumanov
 * @description Метод обновление данных
 * @param obj
 * @param path
 * @param value
 * @param save
 * @param remove
 */
export function updateObjectByPath(
	obj: GenericObject,
	path: string,
	value: any,
	save = false,
	remove = false
): void {
	try {
		const keys = path?.split("."); // Разбиваем строку пути на массив ключей
		let current = obj;

		// Проходим по объекту, создавая отсутствующие ключи
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!current[key]) {
				current[key] = {}; // Создаем объект, если ключ отсутствует
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];

		if (
			save &&
			typeof current[lastKey] === "object" &&
			current[lastKey] !== null
		) {
			console.log("save")
			// Если save: true, объединяем старые значения с новыми, если старое значение — объект
			current[lastKey] = { ...current[lastKey], ...value };
		} else {
			// Иначе просто присваиваем новое значение
			current[lastKey] = value;
		}

		if (remove) {
			// Если флаг удаления, удаляем последний ключ
			console.log("current[lastKey]", current[lastKey], current, obj)
			delete current[lastKey];
			console.log("remove")
		} else if (
			save &&
			typeof current[lastKey] === "object" &&
			current[lastKey] !== null
		) {
			// Если save: true, объединяем старые значения с новыми
			current[lastKey] = { ...current[lastKey], ...value };
		} else {
			// Иначе просто присваиваем новое значение
			current[lastKey] = value;
		}
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
	paths: string | string[]
): void {
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
