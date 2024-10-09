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
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface IUpdateWidgetActions {
	update: (
		data: unknown,
		pathString: string | string[],
		removeObj?: boolean,
		removeKey?: boolean,
		save?: boolean
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
	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const update = (
		newValue: unknown,
		pathString: string | string[],
		removeObj: boolean = false,
		removeKey: boolean = false,
		save: boolean = true
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
				return containerUpdateWrapper((component) => {
					if (component.id === activeElementData?.componentId) {
						const updatedComponent = deepCopy(component);

						// Проверяем, есть ли stories и components внутри stories
						if (updatedComponent?.content?.stories?.components) {
							const updatedStoriesComponents =
								updatedComponent.content.stories.components.map(
									(storyComponent) => {
										// Проверяем widgetActiveIdComponent внутри storyComponent
										if (
											storyComponent.id ===
											activeElementData?.widgetActiveComponentId
										) {
											const updatedStoryComponent =
												deepCopy(storyComponent);

											// Выполняем нужное действие с storyComponent
											if (removeObj) {
												updateDataHandle(
													updatedStoryComponent,
													true,
													true
												);
											} else if (removeKey) {
												removeKeyDataHandle(
													updatedStoryComponent
												);
											} else {
												updateDataHandle(
													updatedStoryComponent,
													save
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
								content: {
									...component.content,
									stories: {
										...component.content.stories,
										components: updatedStoriesComponents,
									},
								},
							};
						}

						return component;
					}

					return component;
				});
			};

			const elementUpdateHandle = () => {
				return containerUpdateWrapper((component) => {
					if (component?.id === activeElementData?.componentId) {
						const updatedComponent = deepCopy(component);

						// Проверяем, есть ли stories и components внутри stories
						if (updatedComponent?.content?.stories?.components) {
							const updatedStoriesComponents =
								updatedComponent.content.stories.components.map(
									(storyComponent) => {
										if (
											storyComponent.id ===
											activeElementData.widgetActiveComponentId
										) {
											// Находим элемент в storyComponent.data.elements
											const elementIndex =
												storyComponent.elements.findIndex(
													(el: IElementTotal) =>
														el.id ===
														activeElementData.widgetActiveElementId
												);

											if (elementIndex !== -1) {
												// Если элемент найден, обновляем его
												if (removeObj) {
													updateDataHandle(
														storyComponent.elements[
															elementIndex
														],
														true,
														true
													);
												} else if (removeKey) {
													removeKeyDataHandle(
														storyComponent.elements[
															elementIndex
														]
													);
												} else {
													updateDataHandle(
														storyComponent.elements[
															elementIndex
														],
														true
													);
												}

												// Обновляем storyComponent с изменённым элементом
												return {
													...storyComponent,
													elements: [
														...storyComponent.elements.slice(
															0,
															elementIndex
														),
														storyComponent.elements[
															elementIndex
														],
														...storyComponent.elements.slice(
															elementIndex + 1
														),
													],
												};
											}
										}
										return storyComponent;
									}
								);

							// Обновляем компонент с новыми stories
							return {
								...component,
								content: {
									...component.content,
									stories: {
										...component.content.stories,
										components: updatedStoriesComponents,
									},
								},
							};
						}

						return component;
					}

					return component;
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
