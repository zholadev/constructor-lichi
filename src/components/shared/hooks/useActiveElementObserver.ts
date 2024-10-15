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
import {
	IElementSchema,
	ISchemaElementInterfaces,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaActiveData } from "@/components/shared/types/interface-schema";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { ISchemaContent } from "@/components/shared/types/interface-schema-content";
import { ISchemaSettings } from "@/components/shared/types/interface-schema-settings";

export interface IActiveElementObserver {
	type: ActiveElementType;
	containerId: string;
	componentId: string;
	elementId: string;
	activeId: string;
	activeData: ISchemaActiveData;
	activeStyle: Record<string, unknown>;
	componentData: ISchemaComponent;
	containerData: ISchemaContainer;
	elementData: IElementSchema;
	widgetData?: TotalComponentTypes;
	widgetType?: WidgetTypes;
	widgetActiveComponentId?: string;
	widgetActiveElementId?: string;
	widgetActiveType?: ActiveElementType;
	widgetActiveData: ISchemaActiveData;
	contentData: ISchemaContent | object;
	settingData: ISchemaSettings | undefined;
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

	const dialog = useDialogAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для получения данных контейнера по containerId
	 */
	const foundContainerData: ISchemaContainer = useMemo(() => {
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
	const foundComponentData: ISchemaComponent = useMemo(() => {
		try {
			if (editorActiveElement?.componentId) {
				const componentData = foundContainerData?.components?.find(
					(component) =>
						component?.id === editorActiveElement?.componentId
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
				const elementData = foundComponentData?.elements.find(
					(element: ISchemaElementInterfaces) =>
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

			const type = editorActiveElement.type as ActiveElementType;

			const activeDataFound = {
				container: foundContainerData,
				component: foundComponentData,
				element: foundElementData,
			}[type];

			const activeIdFound = {
				container: foundContainerData?.id,
				component: foundComponentData?.id,
				element: foundElementData?.id,
			}[type];

			const activeStyleFound = {
				container: foundContainerData?.style,
				component: foundComponentData?.style,
				element: foundElementData?.style,
			}[type];

			// const activeContentData: ISchemaContent = {
			// 	element: foundElementData?.content,
			// 	component: foundComponentData?.content,
			// }[type];

			// const activeSettingData: ISchemaSettings = {
			// 	container: foundComponentData?.settings,
			// 	component: foundComponentData?.settings,
			// 	element: foundElementData?.settings,
			// }[type];

			const activeContentData = (): ISchemaContent | object => {
				if (type === "component") {
					return foundComponentData?.content;
				}
				if (type === "element") {
					return foundComponentData?.content;
				}

				return {};
			};


			const activeSettingData = (): ISchemaSettings | undefined => {
				if (type === "component") {
					return foundComponentData?.settings;
				}
				if (type === "element") {
					return foundComponentData?.settings;
				}
				if (type === "container") {
					return foundComponentData?.settings;
				}

				return {};
			};

			return {
				type,
				activeData: activeDataFound,
				activeId: activeIdFound,
				activeStyle: activeStyleFound,
				containerData: foundContainerData,
				componentId: foundComponentData?.id ?? "",
				componentData: foundComponentData ?? {},
				containerId: editorActiveElement?.containerId ?? "",
				widgetData: foundComponentData?.widgets?.data || {},
				widgetType: !dialog.dialogWidget.open
					? "none"
					: (foundComponentData?.widgets?.type ?? "none"),
				widgetActiveData: editorActiveElement?.widgetActiveData ?? {},
				widgetActiveType:
					editorActiveElement.widgetActiveType ?? "none",
				widgetActiveComponentId:
					editorActiveElement.widgetActiveComponentId ?? "",
				widgetActiveElementId:
					editorActiveElement.widgetActiveElementId ?? "",
				contentData: activeContentData(),
				settingData: activeSettingData(),
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
