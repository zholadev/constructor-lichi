import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";

type UpdateContentKeys =
	| "content"
	| "element"
	| "settings"
	| "component"
	| "styles"
	| "container";

interface IEditorEvent {
	addElement: (type: string) => void;
	updateComponent: (
		data: unknown,
		type: UpdateContentKeys,
		pathString: string,
		removeObj?: boolean,
		removeKey?: boolean
	) => void;
	removeEvent: () => void;
	appendComponent: (data: unknown) => void;
}

const borderKeys = [
	"border",
	"borderLeft",
	"borderTop",
	"borderBottom",
	"borderRight",
];

const updateBorderStyles = (
	styles: CSSProperties,
	newBorderStyle: CSSProperties
): CSSProperties => {
	// Получаем ключ новой границы (например, 'borderLeft')
	const newBorder = Object.keys(newBorderStyle)[0];

	// Создаем копию объекта стилей
	const updatedStyles = { ...styles };

	// Удаляем все остальные border стили, кроме переданного newBorder
	borderKeys.forEach((key) => {
		if (key !== newBorder) {
			delete updatedStyles[key];
		}
	});

	// Добавляем или обновляем значение для переданного newBorder
	updatedStyles[newBorder] = newBorderStyle[newBorder];

	return updatedStyles;
};

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

	const activeElementData = useActiveElementFollowUp();
	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента в компонент
	 * @param data
	 */
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

	const appendComponent = (data: unknown): ITemplateBaseSchema[] | void => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлении - not found",
					"error"
				);
				return;
			}

			if (!activeElementData?.currentActiveId) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData?.containerId) {
				toastMessage("Выбранный контейнер не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ITemplateBaseSchema) => {
					if (container.id === activeElementData.containerId) {
						// Добавляем новый компонент
						const updatedComponents = [
							...container.components,
							{
								id: uuidv4(),
								data: {
									...data,
								},
								is_selected: true,
							},
						];

						// Обновляем gridTemplateColumns на основе количества компонентов
						const gridTemplateColumns = `repeat(${updatedComponents.length}, 1fr)`;

						return {
							...container,
							components: updatedComponents,
							style: {
								...container.style,
								gridTemplateColumns, // Обновляем стиль контейнера
							},
						};
					}
					return container;
				}
			);

			if (newBuildData) {
				toastMessage("Компонент был успешно добавлен!", "success");
				spaceTemplateDataAction(newBuildData);
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления контейнера
	 */
	const removeContainer = () => {
		if (!activeElementData?.containerId) {
			toastMessage(
				"Произошла ошибка id не найдено, обратитесь разработчику",
				"error"
			);
			return;
		}

		const filteredRemovedData = spaceTemplateData.filter(
			(item: ITemplateBaseSchema) =>
				item.id !== activeElementData?.containerId
		);
		spaceTemplateDataAction(filteredRemovedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента
	 */
	const removeComponent = () => {
		if (!activeElementData?.id) {
			toastMessage(
				"Произошла ошибка id не найдено, обратитесь разработчику",
				"error"
			);
			return;
		}

		const filteredRemovedData = spaceTemplateData
			.map((container: ITemplateBaseSchema) => {
				if (container.id === activeElementData.containerId) {
					// Удаляем нужный компонент
					const filteredComponents = container.components.filter(
						(component) =>
							component.data.id !== activeElementData?.id
					);

					// Если компонентов не осталось, удаляем контейнер
					if (filteredComponents.length === 0) {
						return null; // Возвращаем null, чтобы потом исключить этот контейнер
					}

					// Рассчитываем новое значение для gridTemplateColumns в зависимости от оставшихся компонентов
					const columnsCount = filteredComponents.length;
					const newGridTemplateColumns = Array(columnsCount)
						.fill("1fr")
						.join(" "); // Создаём строку типа "1fr 1fr ...", где количество "1fr" равно количеству компонентов

					return {
						...container,
						style: {
							...container.style,
							gridTemplateColumns: newGridTemplateColumns, // Обновляем gridTemplateColumns
						},
						components: filteredComponents, // Возвращаем обновлённые компоненты
					};
				}
				return container;
			})
			.filter((container) => container !== null); // Удаляем все контейнеры, которые были помечены как null

		toastMessage("Компонент успешно удален", "success");
		spaceTemplateDataAction(filteredRemovedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления элемента с компонента
	 */
	const removeElement = () => {
		if (!activeElementData?.currentActiveId) {
			toastMessage(
				"Произошла ошибка id не найдено, обратитесь разработчику",
				"error"
			);
			return;
		}

		const filteredRemovedData = spaceTemplateData.map(
			(container: ITemplateBaseSchema) => {
				if (container.id === activeElementData?.containerId) {
					return {
						...container,
						components: container.components.map((component) => {
							if (component.data.id === activeElementData?.id) {
								return {
									...component,
									is_selected: true,
									data: {
										...component.data,
										elements:
											component.data.elements.filter(
												(element) =>
													element.id !==
													activeElementData?.currentActiveId
											),
									},
								};
							}
							return component;
						}),
					};
				}
				return container;
			}
		);

		toastMessage("Элемент успешно удален", "success");
		spaceTemplateDataAction(filteredRemovedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления выбранного элемента с доски
	 */
	const removeEvent = () => {
		try {
			if (!activeElementData) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData.currentActiveId) {
				toastMessage("Выбранный id не найден", "error");
				return;
			}

			switch (activeElementData?.type) {
				case "container":
					removeContainer();
					break;
				case "element":
					removeElement();
					break;
				case "component":
					removeComponent();
					break;
				default:
					toastMessage("Отсуствует тип для удаления", "error");
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "removeEvent", error);
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
			toastMessage(
				"Ошибка при изменение! Обратитесь разработчику!",
				"error"
			);
			errorHandler("useEditorEvent", "updateObjectByPath", error);
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

	// Простая функция глубокого копирования объекта
	function deepCopy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	const updateComponent = (
		newValue: unknown,
		type: UpdateContentKeys,
		pathString: string | string[],
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

			const updateObjectByPathHandle = (data, save: boolean, remove?: boolean) => {
				return updateObjectByPath(data, pathString, newValue, save, remove);
			};

			const updateDataHandle = (container, save: boolean, remove?: boolean) => {
				updateObjectByPathHandle(container, save, remove);
				toastMessage(
					`Успешно обновлено! ${activeElementData.type}`,
					"success"
				);
			};

			const removeKeyDataHandle = (container, save?: boolean) => {
				deleteMultiplePaths(container, pathString);
				toastMessage("Успешно удалено!", "success");
			};

			const containerUpdateHandle = () => {
				return spaceTemplateData.map(
					(container: ITemplateBaseSchema) => {
						if (container.id === editorActiveElement.containerId) {
							const updatedContainer = deepCopy(container);

							if (removeObj) {
								updateDataHandle(updatedContainer, false, true);
							} else if (removeKey) {
								removeKeyDataHandle(updatedContainer);
							} else {
								updateDataHandle(updatedContainer, true);
							}

							return {
								...container,
								...updatedContainer,
							};
						}
						return container;
					}
				);
			};

			const componentUpdateHandle = () => {
				return spaceTemplateData.map(
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

											if (removeObj) {
												updateDataHandle(
													updatedComponent.data,
													true,
													true
												);
											} else if (removeKey) {
												removeKeyDataHandle(
													updatedComponent.data
												);
											} else {
												updateDataHandle(
													updatedComponent.data,
													true
												);
											}

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
			};

			const elementUpdateHandle = () => {
				return spaceTemplateData.map(
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

											const elementIndex =
												updatedComponent.data.elements.findIndex(
													(el: any) =>
														el.id ===
														editorActiveElement.currentActiveId
												);

											if (elementIndex !== -1) {
												if (removeObj) {
													updateDataHandle(
														updatedComponent.data
															.elements[
															elementIndex
															],
														true,
														true
													);
												} else if (removeKey) {
													removeKeyDataHandle(
														updatedComponent.data
															.elements[
															elementIndex
														]
													);
												} else {
													updateDataHandle(
														updatedComponent.data
															.elements[
															elementIndex
														],
														true
													);
												}

												return {
													...component,
													...updatedComponent,
												};
											}

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
			};

			if (activeElementData.type === "container") {
				const newUpdateContent = containerUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.type === "component") {
				const newUpdateContent = componentUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.type === "element") {
				const newUpdateContent = elementUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else {
				toastMessage("Тип не распознан!", "error");
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
		removeEvent,
		appendComponent,
	};
}
