import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { v4 as uuidv4 } from "uuid";

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

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

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

			const newBuildData = spaceTemplateData.map(
				(container: ISchemaContainer) => {
					if (container.id === editorActiveElement.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									// Находим нужный компонент по id
									if (
										component.data.id ===
										activeElementData.componentId
									) {
										// Проверяем, есть ли stories и components внутри stories
										if (
											component.data.content?.stories
												?.components
										) {
											const updatedComponents =
												component.data.content.stories.components.map(
													(storyComponent) => {
														if (
															storyComponent.data
																?.id ===
															activeElementData.widgetActiveComponentId
														) {
															return {
																...storyComponent,
																data: {
																	...storyComponent.data,
																	elements: [
																		...storyComponent
																			?.data
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
														...component.data
															.content,
														stories: {
															...component.data
																.content
																?.stories,
															components:
																updatedComponents, // Обновляем components в stories
														},
													},
												},
											};
										}
									}

									return component;
								}
							),
						};
					}
					return container;
				}
			);
			console.log("newBuildData", newBuildData);
			if (newBuildData) spaceTemplateDataAction(newBuildData);
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

			const newBuildData = spaceTemplateData.map(
				(container: ISchemaContainer) => {
					if (container.id === activeElementData.containerId) {
						const updatedComponents = container.components.map(
							(component) => {
								// Проверяем, является ли этот компонент тем, который нужно обновить
								if (
									component.data?.id ===
									activeElementData.componentId
								) {
									// Проверяем, есть ли поле content и stories
									if (component.data?.content?.stories) {
										// Обновляем stories.components
										const updatedStoriesComponents = [
											...component.data.content.stories
												.components,
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
														...component.data
															.content.stories,
														components:
															updatedStoriesComponents, // Обновляем массив components в stories
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

	return {
		widgetAddElement,
		widgetCreateComponent,
	};
}
