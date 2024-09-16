import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

type UpdateContentKeys = "content" | "elements" | "settings" | "dir";

interface IEditorEvent {
	addElement: (type: string) => void;
	updateComponent: (data: unknown, type: UpdateContentKeys, pathString: string) => void;
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
	function updateObjectByPath(obj, path, value) {
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

		// Обновляем последний ключ в пути
		current[keys[keys.length - 1]] = value;
	}

	// Простая функция глубокого копирования объекта
	function deepCopy(obj) {
		return JSON.parse(JSON.stringify(obj));
	}

	const updateComponent = (
		newValue: unknown,
		type: UpdateContentKeys,
		pathString: string
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

			if (!editorActiveElement.id) {
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
