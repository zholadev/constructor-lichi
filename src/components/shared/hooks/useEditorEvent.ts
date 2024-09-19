import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

type UpdateContentKeys =
	| "content"
	| "element"
	| "settings"
	| "component"
	| "styles";

interface IEditorEvent {
	addElement: (type: string) => void;
	updateComponent: (
		data: unknown,
		type: UpdateContentKeys,
		pathString: string,
		removeObj: boolean,
		removeKey: boolean
	) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
export default function useEditorEvent(): IEditorEvent {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const addElement = (data: unknown) => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлений - not found",
					"error"
				);
				return;
			}

			if (!editorActiveElement) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!editorActiveElement.id) {
				toastMessage("Выбранный id не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ITemplateBaseSchema) => {
					if (container.id === editorActiveElement.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									if (
										component.data.id ===
										editorActiveElement.id
									) {
										return {
											...component,
											is_selected: true,
											data: {
												...component.data,
												elements: [
													...component.data.elements,
													data,
												],
											},
										};
									}
									return component;
								}
							),
						};
					}
					return container;
				}
			);

			if (newBuildData) spaceTemplateDataAction(newBuildData);
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	// Функция для обновления объекта по заданному пути (string)
	function updateObjectByPath(
		obj,
		path,
		value,
		save = false,
		remove = false
	) {
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

	function deleteObjectByPath(obj: any, path: string) {
		const keys = path.split("."); // Разбиваем строку пути на массив ключей
		let current = obj;

		// Проходим по объекту, доходя до предпоследнего уровня
		for (let i = 0; i < keys.length - 1; i++) {
			const key = keys[i];
			if (!current[key]) {
				return; // Если путь не существует, просто выходим
			}
			current = current[key];
		}

		const lastKey = keys[keys.length - 1];

		// Проверяем, существует ли ключ и является ли это объектом
		if (
			current &&
			typeof current === "object" &&
			current.hasOwnProperty(lastKey)
		) {
			delete current[lastKey]; // Удаляем ключ на последнем уровне
		} else {
			console.warn(`Ключ "${lastKey}" не найден или это не объект`);
		}
	}

	// Простая функция глубокого копирования объекта
	function deepCopy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	const updateComponent = (
		newValue: unknown,
		type: UpdateContentKeys,
		pathString: string,
		removeObj: boolean = false,
		removeKey: boolean = false
	) => {
		try {
			if (!newValue) {
				toastMessage(
					"Произошла ошибка при добавлений - not found data",
					"error"
				);
				return;
			}

			if (!editorActiveElement) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!editorActiveElement.currentActiveId) {
				toastMessage("Выбранный id не найден", "error");
				return;
			}

			if (type === "content") {
				const newUpdateContent = spaceTemplateData.map(
					(container: ITemplateBaseSchema) => {
						if (container.id === editorActiveElement.containerId) {
							return {
								...container,
								components: container.components.map(
									(component) => {
										if (
											component.data.id ===
											editorActiveElement.id
										) {
											/// Создаем глубокую копию компонента, чтобы избежать ошибок с readonly
											const updatedComponent =
												deepCopy(component);

											// Обновляем объект по пути, оставляя остальные данные нетронутыми
											updateObjectByPath(
												updatedComponent.data.content,
												pathString,
												newValue
											);

											toastMessage(
												"Обновленные данные",
												"success"
											);

											return {
												...component,
												...updatedComponent,
											};
										}
										return component;
									}
								),
							};
						}
						return container;
					}
				);

				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (type === "component") {
				const newUpdateContent = spaceTemplateData.map(
					(container: ITemplateBaseSchema) => {
						if (container.id === editorActiveElement.containerId) {
							return {
								...container,
								components: container.components.map(
									(component) => {
										if (
											component.data.id ===
											editorActiveElement.id
										) {
											const updatedComponent =
												deepCopy(component);

											updateObjectByPath(
												updatedComponent.data,
												pathString,
												newValue,
												true
											);

											toastMessage(
												"Обновленные данные",
												"success"
											);

											return {
												...component,
												...updatedComponent,
											};
										}
										return component;
									}
								),
							};
						}
						return container;
					}
				);

				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (type === "element") {
				const newUpdateContent = spaceTemplateData.map(
					(container: ITemplateBaseSchema) => {
						if (container.id === editorActiveElement.containerId) {
							return {
								...container,
								components: container.components.map(
									(component) => {
										if (
											component.data.id ===
											editorActiveElement.id
										) {
											// Делаем глубокую копию компонента
											const updatedComponent =
												deepCopy(component);

											// Находим элемент по ID внутри массива elements
											const elementIndex =
												updatedComponent.data.elements.findIndex(
													(el: any) =>
														el.id ===
														editorActiveElement.currentActiveId
												);

											if (elementIndex !== -1) {
												if (removeObj) {
													toastMessage(
														"Данные успешно удалены!",
														"success"
													);
												} else if (removeKey) {
													// Удаление ключа и его значения по пути
													deleteObjectByPath(
														updatedComponent.data
															.elements[
															elementIndex
														],
														pathString
													);

													toastMessage(
														"Ключ успешно удален",
														"success"
													);

													return {
														...component,
														...updatedComponent,
													};
												} else {
													// Обновляем данные элемента по найденному индексу
													updateObjectByPath(
														updatedComponent.data
															.elements[
															elementIndex
														], // элемент, который нужно обновить
														pathString, // путь, по которому нужно обновить значение
														newValue, // новое значение
														true // сохраняем старые значения, если флаг true
													);

													toastMessage(
														"Данные успешно обновились!",
														"success"
													);

													// Возвращаем обновленный компонент
													return {
														...component,
														...updatedComponent,
													};
												}
											}

											// Если элемент не найден, возвращаем компонент без изменений
											return component;
										}
										return component;
									}
								),
							};
						}
						return container;
					}
				);
				console.log("newUpdateContent", newUpdateContent);
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	return {
		addElement,
		updateComponent,
	};
}
