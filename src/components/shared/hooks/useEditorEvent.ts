import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { v4 as uuidv4 } from "uuid";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IElementTotal } from "@/components/features/app/ui/elements/types/interface-elements";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

type UpdateContentKeys =
	| "content"
	| "element"
	| "settings"
	| "component"
	| "styles"
	| "container";

interface IEditorEvent {
	addElement: (data: IElementTotal) => void;
	updateComponent: (
		data: unknown,
		type: UpdateContentKeys,
		pathString: string | string[],
		removeObj?: boolean,
		removeKey?: boolean
	) => void;
	removeEvent: () => void;
	appendComponent: (data: unknown) => void;
	appendAdditionalComponent: (data: unknown) => void;
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

	const activeElementData = useActiveElementFollowUp();
	const { spaceTemplateDataAction } = useDispatchAction();
	const dialog = useDialogAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента в компонент
	 * @param data
	 */
	const addElement = (data: IElementTotal) => {
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
				(container: ISchemaContainer) => {
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

	const appendComponent = (data: unknown): ISchemaContainer[] | void => {
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

	const appendAdditionalComponent = (
		data: unknown
	): ISchemaContainer[] | void => {
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
				(container: ISchemaContainer) => {
					if (container.id === activeElementData.containerId) {
						const updatedComponents = container.components.map(
							(component) => {
								// Проверяем, является ли этот компонент тем, который нужно обновить
								if (component.data?.id === activeElementData.id) {
									console.log("component", component);
									// Проверяем, есть ли поле content и stories
									if (component.data?.content?.stories) {
										// Обновляем stories.components
										const updatedStoriesComponents = [
											...component.data.content.stories.components,
											{
												id: uuidv4(),
												data: {
													...data,
												},
											},
										];

										return {
											...component,
											data: {
												...component.data,
												content: {
													...component.data.content,
													stories: {
														...component.data.content.stories,
														components: updatedStoriesComponents, // Обновляем массив components в stories
													},
												},
											},
										};
									}
								}

								return component;
							}
						);

						return {
							...container,
							components: updatedComponents,
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
			(item: ISchemaContainer) =>
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
			.map((container: ISchemaContainer) => {
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
			.filter((container: ISchemaContainer) => container !== null); // Удаляем все контейнеры, которые были помечены как null

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

	function deleteMultiplePaths(obj: any, paths: string | string[]) {
		paths.forEach((path) => {
			deleteObjectByPath(obj, path); // Удаляем каждый ключ по переданному пути
		});
	}

	// Простая функция глубокого копирования объекта
	function deepCopy(obj: unknown) {
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

			const updateObjectByPathHandle = (
				data: any,
				save: boolean,
				remove?: boolean
			) => {
				return updateObjectByPath(
					data,
					pathString,
					newValue,
					save,
					remove
				);
			};

			const updateDataHandle = (
				container: ISchemaContainer,
				save: boolean,
				remove?: boolean
			) => {
				updateObjectByPathHandle(container, save, remove);

				if (removeObj) {
					toastMessage("Успешно удалено!", "success");
				} else {
					toastMessage(
						`Успешно обновлено! ${activeElementData.type}`,
						"success"
					);
				}
			};

			const removeKeyDataHandle = (container: ISchemaContainer) => {
				deleteMultiplePaths(container, pathString);
				toastMessage("Успешно удалено!", "success");
			};

			const containerUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
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
				});
			};

			const componentUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
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
				});
			};

			const elementUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
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
														.elements[elementIndex],
													true,
													true
												);
											} else if (removeKey) {
												removeKeyDataHandle(
													updatedComponent.data
														.elements[elementIndex]
												);
											} else {
												updateDataHandle(
													updatedComponent.data
														.elements[elementIndex],
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
				});
			};

			const componentStoriesUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
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
												updatedComponent.data?.content
													?.stories,
												true,
												true
											);
										} else if (removeKey) {
											removeKeyDataHandle(
												updatedComponent.data?.content
													?.stories
											);
										} else {
											updateDataHandle(
												updatedComponent.data?.content
													?.stories,
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
				});
			};

			if (activeElementData.type === "container") {
				const newUpdateContent = containerUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.type === "component") {
				if (dialog.dialogStoriesContainer.open) {
					const newUpdateContent = componentStoriesUpdateHandle();
					if (newUpdateContent)
						spaceTemplateDataAction(newUpdateContent);
				} else {
					const newUpdateContent = componentUpdateHandle();
					if (newUpdateContent)
						spaceTemplateDataAction(newUpdateContent);
				}
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
		appendAdditionalComponent,
	};
}
