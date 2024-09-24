import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";

type UpdateContentKeys =
	| "content"
	| "element"
	| "settings"
	| "component"
	| "styles"
	| "container";

interface ISchemaUpdate {}

// Функция для обновления объекта по заданному пути (string)
function updateObjectByPath(obj, path, value, save = false, remove = false) {
	const keys = path.split("."); // Разбиваем строку пути на массив ключей
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
}

/**
 * @author Zholaman Zhumanov
 * @description Метод удаление
 * @param obj
 * @param path
 */
function deleteObjectByPath(obj: any, path: string) {
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

function deleteMultiplePaths(obj: any, paths: string[]) {
	paths.forEach((path) => {
		deleteObjectByPath(obj, path); // Удаляем каждый ключ по переданному пути
	});
}

/**
 * @author Zholaman Zhumanov
 * @created 24.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
export default function useEventSchemaUpdate(): any {
	const toastMessage = useToastMessage();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementFollowUp();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	// Утилита для копирования объектов
	const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

	// Проверка на наличие выбранного элемента
	const validateActiveElement = (): boolean => {
		// if (!activeElementData) {
		// 	toastMessage("Вы не выбрали компонент", "error");
		// 	return false;
		// }

		if (!activeElementData?.currentActiveId) {
			toastMessage("Выбранный id не найден", "error");
			return false;
		}

		return true;
	};

	const getCurrentComponent = (cb: (...params) => void) => {
		return spaceTemplateData.map((container: ITemplateBaseSchema) => {
			if (container.id === editorActiveElement.containerId) {
				return {
					...container,
					components: container.components.map((component) => {
						if (component.data.id === editorActiveElement.id) {
							cb(...params);
						}
						return component;
					}),
				};
			}
			return container;
		});
	};

	const updateComponent = (
		newValue: unknown,
		type: UpdateContentKeys,
		pathString: string | string[],
		removeObj: boolean = false,
		removeKey: boolean = false
	) => {
		try {
			if (!newValue || !validateActiveElement()) return;

			const updateMap = {
				content: updateContent,
				container: updateContainer,
				component: updateBaseComponent,
				settings: updateComponentSettings,
				element: updateElement,
			};

			const updateFunc = updateMap[type];
			if (updateFunc)
				updateFunc(newValue, pathString, removeObj, removeKey);
		} catch (error) {
			errorHandler("useEditorEvent", "updateComponent", error);
		}
	};

	// Примерные функции обновления для каждого типа данных:
	const updateContent = (
		newValue: unknown,
		pathString: string | string[]
	) => {
		const newUpdateContent = getCurrentComponent()

			spaceTemplateData.map(
			(container: ITemplateBaseSchema) => {
				if (container.id === editorActiveElement.containerId) {
					return {
						...container,
						components: container.components.map((component) => {
							if (component.data.id === editorActiveElement.id) {
								/// Создаем глубокую копию компонента, чтобы избежать ошибок с readonly
								const updatedComponent = deepCopy(component);

								// Обновляем объект по пути, оставляя остальные данные нетронутыми
								updateObjectByPath(
									updatedComponent.data.content,
									pathString,
									newValue
								);

								toastMessage("Обновленные данные", "success");

								return {
									...component,
									...updatedComponent,
								};
							}
							return component;
						}),
					};
				}
				return container;
			}
		);

		if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
	};
	const updateContainer = (
		newValue: unknown,
		pathString: string | string[]
	) => {
		// Логика обновления container
	};
	const updateBaseComponent = (
		newValue: unknown,
		pathString: string | string[]
	) => {
		// Логика обновления component
	};
	const updateComponentSettings = (
		newValue: unknown,
		pathString: string | string[]
	) => {
		// Логика обновления settings
	};
	const updateElement = (
		newValue: unknown,
		pathString: string | string[]
	) => {
		// Логика обновления element
	};

	return updateComponent;
}
