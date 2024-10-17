import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { deepCopy } from "@/components/shared/utils/schema-helpers";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import {ISchemaElementInterfaces} from "@/components/features/app/modules/elements/types/v1/interface-elements";

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
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления компонента с виджета сторис
	 */
	const removeComponent = () => {
		const updatedData = containerUpdateWrapper((component) => {
			if (component.id === activeElementData?.selectComponentId) {
				const updatedComponent = deepCopy(component);

				// Check and update stories if they exist
				if (updatedComponent?.widgets?.data?.components) {
					const updatedStoriesComponents =
						updatedComponent.widgets.data.components.filter(
							(widget) =>
								widget.id !==
								activeElementData?.selectWidgetActiveId
						);

					// Return updated component with updated stories
					return {
						...component,
						widgets: {
							...component.widgets,
							data: updatedStoriesComponents,
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
			if (component.id === activeElementData?.selectComponentId) {
				const updatedComponent = deepCopy(component);

				// Check and update elements if they exist in stories
				if (updatedComponent?.widgets?.data?.components) {
					const updatedStoriesComponents =
						updatedComponent.widgets.data.components.map(
							(widget) => {
								if (
									widget.id ===
									activeElementData.selectWidgetActiveId
								) {
									const updatedElements =
										widget.elements.filter(
											(el: ISchemaElementInterfaces) =>
												el.id !==
												activeElementData.selectWidgetElementId
										);

									// Return storyComponent with updated elements
									return {
										...widget,
										elements: updatedElements,
									};
								}
								return widget;
							}
						);

					return {
						...component,
						widgets: {
							...component.widgets,
							data: updatedStoriesComponents,
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

			if (!activeElementData?.selectActiveId) {
				toastMessage("activeId не найден useRemoveActions", "error");
				return;
			}

			switch (activeElementData?.selectWidgetActiveType) {
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
