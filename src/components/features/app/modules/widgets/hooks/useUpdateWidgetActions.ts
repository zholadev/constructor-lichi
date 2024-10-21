import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import {
	deepCopy,
	deleteMultiplePaths,
	removeObjectByPath,
	updateObjectByPath,
} from "@/components/shared/utils/schema-helpers";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface IUpdateWidgetActions {
	update: (
		data: unknown,
		pathString: string,
		pathMultiString?: string[],
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
	const { spaceTemplateDataAction } = useDispatchAction();
	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	const activeElementData = useActiveElementObserver();

	const update = (
		newValue: unknown,
		pathString: string,
		pathMultiString?: string[],
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

			if (!activeElementData?.selectActiveId) {
				toastMessage("activeId не найден в updateComponent", "error");
				return;
			}

			const updateObjectByPathHandle = (
				data: any,
				path: string,
				saveData: boolean
			) => {
				return updateObjectByPath(data, path, newValue, saveData);
			};

			const updateDataHandle = (
				data: any,
				path: string,
				saveData: boolean
			) => {
				updateObjectByPathHandle(data, path, saveData);

				toastMessage(
					`Успешно обновлено! ${activeElementData?.selectType}`,
					"success"
				);
			};

			const removeObjectHandle = (data: any, path: string) => {
				removeObjectByPath(data, path);
				toastMessage("Успешно удалено!", "success");
			};

			const removeKeyDataHandle = (data: any) => {
				deleteMultiplePaths(data, pathMultiString);
				toastMessage("Успешно удалено!", "success");
			};

			const componentUpdateHandle = () => {
				return containerUpdateWrapper((component) => {
					if (component.id === activeElementData?.selectComponentId) {
						const updatedComponent = deepCopy(component);

						// Проверяем, есть ли stories и components внутри stories
						if (updatedComponent?.widgets?.data?.components) {
							const updatedStoriesComponents =
								updatedComponent.widgets.data.components.map(
									(widget) => {
										// Проверяем widgetActiveIdComponent внутри storyComponent
										if (
											widget.id ===
											activeElementData?.selectWidgetActiveId
										) {
											const updatedStoryComponent =
												deepCopy(widget);

											// Выполняем нужное действие с storyComponent
											if (removeObj) {
												removeObjectHandle(
													updatedStoryComponent,
													pathString
												);
											} else if (removeKey) {
												removeKeyDataHandle(
													updatedStoryComponent
												);
											} else {
												updateDataHandle(
													updatedStoryComponent,
													pathString,
													save
												);
											}

											return {
												...widget,
												...updatedStoryComponent,
											};
										}

										return widget;
									}
								);

							return {
								...component,
								widgets: {
									...component.widgets,
									data: {
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
					if (
						component?.id === activeElementData?.selectComponentId
					) {
						const updatedComponent = deepCopy(component);

						// Проверяем, есть ли stories и components внутри stories
						if (updatedComponent?.widgets?.data?.components) {
							const updatedStoriesComponents =
								updatedComponent.widgets.data.components.map(
									(widget) => {
										if (
											widget.id ===
											activeElementData.selectWidgetComponentId
										) {
											// Находим элемент в storyComponent.data.elements
											const elementIndex =
												widget.elements.findIndex(
													(
														el: ISchemaElementInterfaces
													) =>
														el.id ===
														activeElementData?.selectWidgetElementId
												);

											if (elementIndex !== -1) {
												if (removeObj) {
													removeObjectHandle(
														widget.elements[
															elementIndex
														],
														pathString
													);
												} else if (removeKey) {
													removeKeyDataHandle(
														widget.elements[
															elementIndex
														]
													);
												} else {
													updateDataHandle(
														widget.elements[
															elementIndex
														],
														pathString,
														save
													);
												}

												return {
													...widget,
													elements: [
														...widget.elements.slice(
															0,
															elementIndex
														),
														widget.elements[
															elementIndex
														],
														...widget.elements.slice(
															elementIndex + 1
														),
													],
												};
											}
										}
										return widget;
									}
								);

							return {
								...component,
								widgets: {
									...component.widgets,
									data: {
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

			if (activeElementData?.selectWidgetActiveType === "component") {
				const newUpdateContent = componentUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (
				activeElementData?.selectWidgetActiveType === "element"
			) {
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
