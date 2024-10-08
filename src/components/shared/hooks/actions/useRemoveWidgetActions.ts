import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { deepCopy } from "@/components/shared/utils/schema-helpers";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface IRemoveWidgetActions {
	removeWidget: () => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useRemoveWidgetActions(): IRemoveWidgetActions {
	const toastMessage = useToastMessage();
	const activeElementHandle = useActiveElement();
	const dialog = useDialogAction();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента с виджета сторис
	 */
	const removeComponent = () => {
		const updatedData = containerUpdateWrapper((component) => {
			if (component.data.id === activeElementData?.componentId) {
				const updatedComponent = deepCopy(component);

				// Check and update stories if they exist
				if (updatedComponent.data.content?.stories?.components) {
					const updatedStoriesComponents =
						updatedComponent.data.content.stories.components.filter(
							(storyComponent) =>
								storyComponent.data.id !==
								activeElementData?.widgetActiveComponentId
						);

					// Return updated component with updated stories
					return {
						...component,
						data: {
							...component.data,
							content: {
								...component.data.content,
								stories: {
									...component.data.content.stories,
									components: updatedStoriesComponents,
								},
							},
						},
					};
				}
			}
			return component;
		});

		toastMessage("Компонент успешно удален", "success");
		spaceTemplateDataAction(updatedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления элемента с виджета
	 */
	const removeElement = () => {
		const updatedData = containerUpdateWrapper((component) => {
			if (component.data.id === activeElementData?.componentId) {
				const updatedComponent = deepCopy(component);

				// Check and update elements if they exist in stories
				if (updatedComponent.data.content?.stories?.components) {
					const updatedStoriesComponents =
						updatedComponent.data.content.stories.components.map(
							(storyComponent) => {
								if (
									storyComponent.data.id ===
									activeElementData.widgetActiveComponentId
								) {
									const updatedElements =
										storyComponent.data.elements.filter(
											(el: IElementTotal) =>
												el.id !==
												activeElementData.widgetActiveElementId
										);

									// Return storyComponent with updated elements
									return {
										...storyComponent,
										data: {
											...storyComponent.data,
											elements: updatedElements,
										},
									};
								}
								return storyComponent;
							}
						);

					return {
						...component,
						data: {
							...component.data,
							content: {
								...component.data.content,
								stories: {
									...component.data.content.stories,
									components: updatedStoriesComponents,
								},
							},
						},
					};
				}
			}
			return component;
		});

		toastMessage("Элемент успешно удален", "success");
		spaceTemplateDataAction(updatedData);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента или элемента с виджета
	 */
	const removeWidget = () => {
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

			switch (activeElementData?.widgetActiveType) {
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
		removeWidget,
	};
}
