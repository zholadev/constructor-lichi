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

interface IActiveElementObserver {
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
			if (editorActiveElement?.type === "") {
				return null;
			}
			if (!editorActiveElement?.containerId) {
				toastMessage(
					"Не удалось найти выбранный контейнер! Убедитесь, что containerId выбран!",
					"error"
				);
				return null;
			}

			const containerData = spaceTemplateData.find(
				(container: ISchemaContainer) =>
					container?.id === editorActiveElement?.containerId
			);

			if (!containerData) {
				toastMessage(
					"Контейнер с данным ID не найден! Проверьте корректность containerId.",
					"error"
				);
				return null;
			}

			return containerData;
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
			if (
				!editorActiveElement?.componentId &&
				editorActiveElement?.containerId
			) {
				toastMessage(
					"Не удалось найти выбранный компонент! Убедитесь, что componentId выбран!",
					"error"
				);
				return null;
			}
			const componentData = foundContainerData?.components?.find(
				(component) =>
					component?.data?.id === editorActiveElement?.componentId
			);

			if (!componentData && editorActiveElement?.componentId) {
				toastMessage(
					"Компонент с данным ID не найден! Проверьте корректность componentId.",
					"error"
				);
				return null;
			}

			return componentData;
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
	}, [foundContainerData, spaceTemplateData, editorActiveElement]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных с элемента по elementId
	 */
	const foundElementData = useMemo(() => {
		try {
			if (editorActiveElement.type !== "element") {
				return null;
			}
			if (
				!editorActiveElement?.elementId &&
				editorActiveElement.componentId
			) {
				toastMessage(
					"Не удалось найти выбранный элемент! Убедитесь, что elementId выбран!",
					"error"
				);
				return null;
			}

			const elementData = foundComponentData?.data.elements.find(
				(element: IElementSchema) =>
					element?.id === editorActiveElement?.elementId
			);

			if (!elementData && editorActiveElement?.elementId) {
				toastMessage(
					"Элемент с данным ID не найден! Проверьте корректность elementId.",
					"error"
				);
				return null;
			}

			return elementData;
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

			const data = {
				container: foundContainerData,
				component: foundComponentData?.data,
				element: foundElementData,
			}[type];

			const currentActiveId = {
				container: foundContainerData?.id,
				component: foundComponentData?.data?.id,
				element: foundElementData?.id,
			}[type];

			const style = {
				container: foundContainerData?.style,
				component: foundComponentData?.data?.style,
				element: foundElementData?.style,
			}[type];

			return {
				type,
				activeData: data,
				activeId: currentActiveId,
				activeStyle: style,
				containerData: foundContainerData,
				componentId: foundComponentData?.data?.id ?? "",
				componentData: foundComponentData?.data ?? {},
				containerId: editorActiveElement?.containerId ?? "",
				widgetData: foundComponentData?.data?.content?.stories || {},
				widgetType: editorAdditionalActiveElement ?? "none",
				widgetActiveComponentId:
					editorActiveElement.additionalCurrentId ?? "",
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
