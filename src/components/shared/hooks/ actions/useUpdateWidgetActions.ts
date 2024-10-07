import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import {
	deepCopy,
	deleteMultiplePaths,
	updateObjectByPath,
} from "@/components/shared/utils/schema-helpers";

interface IUpdateWidgetActions {
	update: (
		data: unknown,
		pathString: string | string[],
		removeObj?: boolean,
		removeKey?: boolean
	) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 06.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo REFACTORING
 * @fixme
 * @constructor
 */
export default function useUpdateWidgetActions(): IUpdateWidgetActions {
	const toastMessage = useToastMessage();
	const activeElementHandle = useActiveElement();
	const dialog = useDialogAction();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const update = (
		newValue: unknown,
		pathString: string | string[],
		removeObj: boolean = false,
		removeKey: boolean = false
	) => {
		try {
			if (!newValue) {
				toastMessage(
					"Произошла ошибка при добавлений - not found value - useUpdateActions",
					"error"
				);
				return;
			}

			if (!activeElementData?.activeId) {
				toastMessage("activeId не найден в updateComponent", "error");
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

			const componentUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
					if (container.id === activeElementData?.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									if (
										component.data.id ===
										activeElementData?.componentId
									) {
										const updatedComponent =
											deepCopy(component);

										// Проверяем, есть ли stories и components внутри stories
										if (
											updatedComponent.data.content
												?.stories?.components
										) {
											const updatedStoriesComponents =
												updatedComponent.data.content.stories.components.map(
													(storyComponent) => {
														// Проверяем widgetActiveIdComponent внутри storyComponent
														if (
															storyComponent.data
																.id ===
															activeElementData?.widgetActiveComponentId
														) {
															const updatedStoryComponent =
																deepCopy(
																	storyComponent
																);

															// Выполняем нужное действие с storyComponent
															if (removeObj) {
																updateDataHandle(
																	updatedStoryComponent.data,
																	true,
																	true
																);
															} else if (
																removeKey
															) {
																removeKeyDataHandle(
																	updatedStoryComponent.data
																);
															} else {
																updateDataHandle(
																	updatedStoryComponent.data,
																	true
																);
															}

															return {
																...storyComponent,
																...updatedStoryComponent,
															};
														}

														return storyComponent;
													}
												);

											// Обновляем компонент с обновлёнными stories
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
																.stories,
															components:
																updatedStoriesComponents,
														},
													},
												},
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

			const elementUpdateHandle = () => {
				return spaceTemplateData.map((container: ISchemaContainer) => {
					if (container.id === activeElementData?.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									if (
										component.data.id ===
										activeElementData?.componentId
									) {
										const updatedComponent =
											deepCopy(component);

										// Проверяем, есть ли stories и components внутри stories
										if (
											updatedComponent.data.content
												?.stories?.components
										) {
											const updatedStoriesComponents =
												updatedComponent.data.content.stories.components.map(
													(storyComponent) => {
														if (
															storyComponent.data
																.id ===
															activeElementData.widgetActiveComponentId
														) {
															// Находим элемент в storyComponent.data.elements
															const elementIndex =
																storyComponent.data.elements.findIndex(
																	(el: any) =>
																		el.id ===
																		activeElementData.widgetActiveElementId
																);

															if (
																elementIndex !==
																-1
															) {
																// Если элемент найден, обновляем его
																if (removeObj) {
																	updateDataHandle(
																		storyComponent
																			.data
																			.elements[
																			elementIndex
																		],
																		true,
																		true
																	);
																} else if (
																	removeKey
																) {
																	removeKeyDataHandle(
																		storyComponent
																			.data
																			.elements[
																			elementIndex
																		]
																	);
																} else {
																	updateDataHandle(
																		storyComponent
																			.data
																			.elements[
																			elementIndex
																		],
																		true
																	);
																}

																// Обновляем storyComponent с изменённым элементом
																return {
																	...storyComponent,
																	data: {
																		...storyComponent.data,
																		elements:
																			[
																				...storyComponent.data.elements.slice(
																					0,
																					elementIndex
																				),
																				storyComponent
																					.data
																					.elements[
																					elementIndex
																				],
																				...storyComponent.data.elements.slice(
																					elementIndex +
																						1
																				),
																			],
																	},
																};
															}
														}
														return storyComponent;
													}
												);

											// Обновляем компонент с новыми stories
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
																.stories,
															components:
																updatedStoriesComponents,
														},
													},
												},
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

			if (activeElementData.widgetActiveType === "component") {
				const newUpdateContent = componentUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.widgetActiveType === "element") {
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
		update,
	};
}
