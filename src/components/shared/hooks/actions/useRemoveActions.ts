import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { errorMessage } from "@/components/shared/constants/text";

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

	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const toggleEditorRemoveTemplateHandle = () =>
		editorRemoveTemplateAction(!editorRemoveTemplate);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления контейнера
	 */
	const removeContainer = (id?: string) => {
		try {
			// Удаления контейнера с id
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

			if (filteredRemovedData) {
				editorActiveElementAction({
					type: "none",
					elementId: "",
					containerId: "",
					componentId: "",
					activeData: {},
				});
				toastMessage(
					"Контейнер успешно удален! removeContainer - useRemoveActions",
					"success"
				);
				spaceTemplateDataAction(filteredRemovedData);
			}
		} catch (error) {
			toastMessage(
				`${errorMessage}! removeContainer - useElementActions`,
				"error"
			);
			return errorHandler("useRemoveActions", "removeContainer", error);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента
	 */
	const removeComponent = () => {
		try {
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
								component.id !== activeElementData?.componentId
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

			if (filteredRemovedData) {
				editorActiveElementAction({
					type: "none",
					elementId: "",
					containerId: "",
					componentId: "",
					activeData: {},
				});
				toastMessage(
					"Компонент успешно удален! removeComponent - useRemoveActions",
					"success"
				);
				spaceTemplateDataAction(filteredRemovedData);
			}
		} catch (error) {
			toastMessage(
				`${errorMessage}! removeComponent - useElementActions`,
				"error"
			);
			return errorHandler("useRemoveActions", "removeComponent", error);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления элемента с компонента
	 */
	const removeElement = () => {
		try {
			if (!activeElementData?.activeId) {
				toastMessage(
					"Произошла ошибка id не найдено, обратитесь разработчику",
					"error"
				);
				return;
			}

			const filteredRemovedData = containerUpdateWrapper((component) => {
				if (component?.id === activeElementData?.componentId) {
					return {
						...component,
						elements: component.elements.filter(
							(element: IElementTotal) =>
								element.id !== activeElementData?.activeId
						),
					};
				}
				return component;
			});

			if (filteredRemovedData) {
				editorActiveElementAction({
					type: "none",
					elementId: "",
					containerId: "",
					componentId: "",
					activeData: {},
				});
				toastMessage(
					"Элемент успешно удален! removeElement - useRemoveActions",
					"success"
				);
				spaceTemplateDataAction(filteredRemovedData);
			}
		} catch (error) {
			toastMessage(
				`${errorMessage}! removeElement - useRemoveActions`,
				"error"
			);
			return errorHandler("useRemoveActions", "removeElement", error);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления выбранного элемента с доски
	 */
	const remove = () => {
		try {
			if (!activeElementData) {
				toastMessage(
					"Вы не выбрали компонент! useRemoveActions",
					"error"
				);
				return;
			}

			if (!activeElementData.activeId) {
				toastMessage("activeId не найден! useRemoveActions", "error");
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
			toastMessage(`${errorMessage}! remove - useRemoveActions`, "error");
			return errorHandler("useRemoveActions", "removeElement", error);
		}
	};

	return {
		remove,
		removeContainer,
	};
}
