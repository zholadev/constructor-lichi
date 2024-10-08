import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { v4 as uuidv4 } from "uuid";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";

interface IWidgetActions {
	widgetAddElement: (data: IElementTotal) => void;
	widgetCreateComponent: (data: unknown) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 05.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useWidgetActions(): IWidgetActions {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	const widgetAddElement = (data: IElementTotal) => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлении - not found",
					"error"
				);
				return;
			}

			if (!activeElementData) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData.widgetActiveComponentId) {
				toastMessage("widgetActiveComponentId не найден", "error");
				return;
			}

			const updateData = containerUpdateWrapper((component) => {
				// Находим нужный компонент по id
				if (component.data.id === activeElementData.componentId) {
					// Проверяем, есть ли stories и components внутри stories
					if (component.data.content?.stories?.components) {
						const updatedComponents =
							component.data.content.stories.components.map(
								(storyComponent) => {
									if (
										storyComponent.data?.id ===
										activeElementData.widgetActiveComponentId
									) {
										return {
											...storyComponent,
											data: {
												...storyComponent.data,
												elements: [
													...storyComponent?.data
														?.elements,
													data,
												],
											},
										};
									}
									return storyComponent;
								}
							);

						// Обновляем компонент с новым массивом components в stories
						return {
							...component,
							data: {
								...component.data,
								content: {
									...component.data.content,
									stories: {
										...component.data.content?.stories,
										components: updatedComponents, // Обновляем components в stories
									},
								},
							},
						};
					}
				}

				return component;
			});

			if (updateData) {
				toastMessage("Элемент был успешно добавлен!", "success");
				spaceTemplateDataAction(updateData);
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания компонента для виджетов
	 * @param data
	 */
	const widgetCreateComponent = (
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

			if (!activeElementData?.activeId) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData?.containerId) {
				toastMessage("Выбранный контейнер не найден", "error");
				return;
			}

			const updateData = containerUpdateWrapper((component) => {
				// Проверяем, является ли этот компонент тем, который нужно обновить
				if (component.data?.id === activeElementData.componentId) {
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
			});

			if (updateData) {
				toastMessage("Компонент был успешно добавлен!", "success");
				spaceTemplateDataAction(updateData);
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	return {
		widgetAddElement,
		widgetCreateComponent,
	};
}
