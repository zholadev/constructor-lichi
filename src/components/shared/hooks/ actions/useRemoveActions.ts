import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";

interface IRemoveActions {
	remove: () => void;
	removeContainer: (id: string) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 06.10.2024
 * @description Хук для удаления компонентов, элементов и контейнеров
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useRemoveActions(): IRemoveActions {
	const toastMessage = useToastMessage();
	const activeElementData = useActiveElementObserver();
	const {
		spaceTemplateDataAction,
		editorRemoveTemplateAction,
		editorActiveElementAction,
	} = useDispatchAction();

	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const toggleEditorRemoveTemplateHandle = () =>
		editorRemoveTemplateAction(!editorRemoveTemplate);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления контейнера
	 */
	const removeContainer = (id?: string) => {
		if (id) {
			if (!id) {
				toastMessage(
					"Произошла ошибка id не найдено, обратитесь разработчику",
					"error"
				);
				return;
			}

			const filteredRemovedData = spaceTemplateData.filter(
				(container: ISchemaContainer) => container.id !== id
			);

			if (!filteredRemovedData) {
				toastMessage(
					"Произошла ошибка! данные контейнера не найдено, обратитесь разработчику",
					"error"
				);
				return;
			}

			spaceTemplateDataAction(filteredRemovedData);
			toggleEditorRemoveTemplateHandle();

			return;
		}

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
		editorActiveElementAction({
			type: "none",
			elementId: "",
			containerId: "",
			componentId: "",
			activeData: {},
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента
	 */
	const removeComponent = () => {
		if (!activeElementData?.activeId) {
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
							component.data.id !== activeElementData?.componentId
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

					if (
						container.type === "swiper" ||
						container.type === "category_list_container"
					) {
						return {
							...container,
							style: {
								...container.style,
							},
							components: filteredComponents, // Возвращаем обновлённые компоненты
						};
					}

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

		editorActiveElementAction({
			type: "none",
			elementId: "",
			containerId: "",
			componentId: "",
			activeData: {},
		});
		toastMessage("Компонент успешно удален", "success");
		spaceTemplateDataAction(filteredRemovedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления элемента с компонента
	 */
	const removeElement = () => {
		if (!activeElementData?.activeId) {
			toastMessage(
				"Произошла ошибка id не найдено, обратитесь разработчику",
				"error"
			);
			return;
		}

		const filteredRemovedData = spaceTemplateData.map(
			(container: ISchemaContainer) => {
				if (container.id === activeElementData?.containerId) {
					return {
						...container,
						components: container.components.map((component) => {
							if (
								component.data.id ===
								activeElementData?.componentId
							) {
								return {
									...component,
									data: {
										...component.data,
										elements:
											component.data.elements.filter(
												(element: IElementTotal) =>
													element.id !==
													activeElementData?.activeId
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

		editorActiveElementAction({
			type: "none",
			elementId: "",
			containerId: "",
			componentId: "",
			activeData: {},
		});
		toastMessage("Элемент успешно удален", "success");
		spaceTemplateDataAction(filteredRemovedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления выбранного элемента с доски
	 */
	const remove = () => {
		try {
			if (!activeElementData) {
				toastMessage(
					"Вы не выбрали компонент useRemoveActions",
					"error"
				);
				return;
			}

			if (!activeElementData.activeId) {
				toastMessage("activeId не найден useRemoveActions", "error");
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
				errorHandler("useRemoveActions", "removeEvent", error);
			}
		}
	};

	return {
		remove,
		removeContainer,
	};
}
