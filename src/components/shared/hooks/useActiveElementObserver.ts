"use client";

import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	ActiveElementType,
	TotalComponentTypes,
	WidgetTypes,
} from "@/components/shared/types/types";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IElementSchema } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

export interface IActiveElementObserver {
	type: ActiveElementType;
	containerId: string;
	componentId: string;
	elementId: string;
	activeId: string;
	activeData: ISchemaComponent | ISchemaContainer | IElementSchema | unknown;
	activeStyle: Record<string, unknown>;
	componentData: ISchemaComponent;
	containerData: ISchemaContainer;
	elementData: IElementSchema;
	widgetData?: TotalComponentTypes;
	widgetType?: WidgetTypes;
	widgetActiveComponentId?: string;
	widgetActiveElementId?: string;
	widgetActiveType?: ActiveElementType;
	widgetActiveData?:
		| ISchemaComponent
		| ISchemaContainer
		| IElementSchema
		| unknown;
}

/**
 * @author Zholaman Zhumanov
 * @created 23.09.2024
 * @description Хук возвращает данные активного элемента и следит за обновленными данными
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @constructor
 */
export default function useActiveElementObserver(): IActiveElementObserver | null {
	const toastMessage = useToastMessage();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных контейнера по containerId
	 */
	const foundContainerData: ISchemaContainer | null = useMemo(() => {
		try {
			if (editorActiveElement?.containerId) {
				const containerData = spaceTemplateData.find(
					(container: ISchemaContainer) =>
						container?.id === editorActiveElement?.containerId
				);

				if (!containerData) {
					toastMessage(
						"Контейнер с данными не найден! Проверьте корректность containerId. useActiveElementObserver",
						"error"
					);
					return null;
				}

				return containerData;
			}
			return null;
		} catch (error) {
			toastMessage(
				"Произошла ошибка в foundContainerData в useActiveElementObserver",
				"error"
			);
			return errorHandler(
				"useActiveElementObserver",
				"foundContainerData",
				error
			);
		}
	}, [editorActiveElement, spaceTemplateData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных компонента по componentId
	 */
	const foundComponentData = useMemo(() => {
		try {
			if (editorActiveElement?.componentId) {
				const componentData = foundContainerData?.components?.find(
					(component) =>
						component?.data?.id === editorActiveElement?.componentId
				);

				// if (!componentData && editorActiveElement?.componentId) {
				// 	toastMessage(
				// 		"Компонент с данными не найден! Проверьте корректность componentId. useActiveElementObserver",
				// 		"error"
				// 	);
				// 	return null;
				// }

				return componentData;
			}
			return null;
		} catch (error) {
			toastMessage(
				"Произошла ошибка в foundComponentData  в useActiveElementObserver",
				"error"
			);
			return errorHandler(
				"useActiveElementObserver",
				"foundContainerData",
				error
			);
		}
	}, [
		foundContainerData,
		editorActiveElement,
		editorActiveElement?.componentId,
	]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных с элемента по elementId
	 */
	const foundElementData = useMemo(() => {
		try {
			if (editorActiveElement?.elementId) {
				const elementData = foundComponentData?.data.elements.find(
					(element: IElementSchema) =>
						element?.id === editorActiveElement?.activeId
				);

				if (!elementData && editorActiveElement?.elementId) {
					toastMessage(
						"Элемент с данными не найден! Проверьте корректность elementId. useActiveElementObserver",
						"error"
					);
					return null;
				}

				return elementData;
			}
			return null;
		} catch (error) {
			toastMessage(
				"Произошла ошибка в foundElementData в useActiveElementObserver",
				"error"
			);
			return errorHandler(
				"useActiveElementObserver",
				"foundContainerData",
				error
			);
		}
	}, [
		spaceTemplateData,
		foundComponentData,
		foundContainerData,
		editorActiveElement,
	]);

	return useMemo((): IActiveElementObserver | null => {
		try {
			if (!spaceTemplateData || !editorActiveElement) return null;

			const type = editorActiveElement.type ?? "none";

			const activeDataFound = {
				container: foundContainerData,
				component: foundComponentData?.data,
				element: foundElementData,
			}[type];

			const activeIdFound = {
				container: foundContainerData?.id,
				component: foundComponentData?.data?.id,
				element: foundElementData?.id,
			}[type];

			const activeStyleFound = {
				container: foundContainerData?.style,
				component: foundComponentData?.data?.style,
				element: foundElementData?.style,
			}[type];

			return {
				type,
				activeData: activeDataFound,
				activeId: activeIdFound,
				activeStyle: activeStyleFound,
				containerData: foundContainerData,
				componentId: foundComponentData?.data?.id ?? "",
				componentData: foundComponentData?.data ?? {},
				containerId: editorActiveElement?.containerId ?? "",
				widgetData: foundComponentData?.data?.content?.stories || {},
				widgetType: editorAdditionalActiveElement ?? "none",
				widgetActiveData: editorActiveElement?.widgetActiveData ?? {},
				widgetActiveType:
					editorActiveElement?.widgetActiveType ?? "none",
				widgetActiveComponentId:
					editorActiveElement.widgetActiveComponentId ?? "",
				widgetActiveElementId:
					editorActiveElement.widgetActiveElementId ?? "",
			};
		} catch (error) {
			errorHandler("useActiveElementFollowUp", "root", error);
			return null;
		}
	}, [
		editorActiveElement,
		spaceTemplateData,
		editorAdditionalActiveElement,
		foundContainerData,
		foundComponentData,
		foundElementData,
	]);
}
