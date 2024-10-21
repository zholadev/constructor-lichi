import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { v4 as uuidv4 } from "uuid";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface IWidgetActions {
	widgetAddElement: (data: ISchemaElementInterfaces) => void;
	widgetCreateComponent: (data: ISchemaComponent) => void;
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента в компонент виджета
	 * @param data
	 */
	const widgetAddElement = (data: ISchemaElementInterfaces) => {
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

			if (!activeElementData?.selectWidgetActiveId) {
				toastMessage("widgetActiveComponentId не найден", "error");
				return;
			}

			const updateData = containerUpdateWrapper((component) => {
				// Находим нужный компонент по id
				if (component?.id === activeElementData?.selectComponentId) {
					// Проверяем, есть ли stories и components внутри stories
					if (component.widgets?.data?.components) {
						const updatedComponents =
							component.widgets.data.components.map(
								(widgetItem) => {
									if (
										widgetItem?.id ===
										activeElementData?.selectWidgetActiveId
									) {
										return {
											...widgetItem,
											elements: [
												...widgetItem.elements,
												data,
											],
										};
									}
									return widgetItem;
								}
							);

						return {
							...component,
							widgets: {
								...component.widgets,
								data: {
									components: updatedComponents,
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
		data: ISchemaComponent
	): ISchemaContainer[] | void => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлении - not found",
					"error"
				);
				return;
			}

			if (!activeElementData?.selectActiveId) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData?.selectContainerId) {
				toastMessage("Выбранный контейнер не найден", "error");
				return;
			}

			const updateData = containerUpdateWrapper((component) => {
				if (component?.id === activeElementData?.selectComponentId) {
					if (component?.widgets?.data?.components) {
						const updateComponents = [
							...component.widgets.data.components,
							{
								...data,
								id: uuidv4(),
							},
						];

						return {
							...component,
							widgets: {
								...component.widgets,
								data: {
									components: updateComponents,
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
