import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

export // Функция для обновления объекта по заданному пути (string)
function updateObjectByPath(
	obj: Record<string, unknown>,
	path: string,
	value: unknown,
	save = false,
	remove = false
) {
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
			// Если save: true, объединяем старые значения с новыми, если старое значение — объект
			current[lastKey] = { ...current[lastKey], ...value };
		} else {
			// Иначе просто присваиваем новое значение
			current[lastKey] = value;
		}

		if (remove) {
			// Если флаг удаления, удаляем последний ключ
			delete current[lastKey];
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
export function deleteObjectByPath(obj: any, path: string) {
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

export function deleteMultiplePaths(obj: any, paths: string | string[]) {
	paths.forEach((path) => {
		deleteObjectByPath(obj, path); // Удаляем каждый ключ по переданному пути
	});
}

// Простая функция глубокого копирования объекта
export function deepCopy(obj: unknown) {
	return JSON.parse(JSON.stringify(obj));
}
