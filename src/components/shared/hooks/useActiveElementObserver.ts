"use client";

import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ActiveElementType, SchemaData } from "@/components/shared/types/types";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

export interface IActiveElementObserver {
	selectType: ActiveElementType;
	selectContainerId: string;
	selectComponentId: string;
	selectElementId: string;
	selectActiveId: string;
	selectComponentData: ISchemaComponent | null;
	selectContainerData: ISchemaContainer | null;
	selectElementData: ISchemaElementInterfaces | null;
	selectActiveData: SchemaData | null;
	selectWidgetData: ISchemaComponent[] | null;
	selectWidgetActiveType: ActiveElementType;
	selectWidgetActiveData: ISchemaComponent | ISchemaElementInterfaces | null;
	selectWidgetIsEditing: boolean;
	selectWidgetActiveId: string;
	selectWidgetComponentId: string;
	selectWidgetElementId: string;
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
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const getContainerData = useMemo((): ISchemaContainer | null => {
		try {
			if (!editorActiveElement?.selectContainerId) return null;
			const containerData = spaceTemplateData.find(
				(container: ISchemaContainer) =>
					container.id === editorActiveElement.selectContainerId
			);

			if (!containerData) {
				toastMessage(
					"Контейнер с данными не найден! Проверьте корректность containerId. useActiveElementObserver",
					"error"
				);
				return null;
			}

			return containerData;
		} catch (error) {
			toastMessage(
				"Ошибка в foundContainerData в useActiveElementObserver",
				"error"
			);
			errorHandler(
				"useActiveElementObserver",
				"foundContainerData",
				error
			);
			return null;
		}
	}, [editorActiveElement, spaceTemplateData]);

	const getComponentData = useMemo((): ISchemaComponent | null => {
		try {
			if (!editorActiveElement?.selectComponentId || !getContainerData)
				return null;
			const componentData = getContainerData.components?.find(
				(component) =>
					component.id === editorActiveElement.selectComponentId
			);
			return componentData || null;
		} catch (error) {
			toastMessage(
				"Ошибка в foundComponentData в useActiveElementObserver",
				"error"
			);
			errorHandler(
				"useActiveElementObserver",
				"foundComponentData",
				error
			);
			return null;
		}
	}, [editorActiveElement, getContainerData]);

	const getElementData = useMemo((): ISchemaElementInterfaces | null => {
		try {
			if (!editorActiveElement?.selectElementId || !getComponentData)
				return null;
			const elementData = getComponentData.elements?.find(
				(element) => element.id === editorActiveElement.selectElementId
			);
			if (!elementData) {
				toastMessage(
					"Элемент с данными не найден! Проверьте корректность elementId. useActiveElementObserver",
					"error"
				);
			}
			return elementData || null;
		} catch (error) {
			toastMessage(
				"Ошибка в foundElementData в useActiveElementObserver",
				"error"
			);
			errorHandler("useActiveElementObserver", "foundElementData", error);
			return null;
		}
	}, [editorActiveElement, getComponentData]);

	const getActiveData = useMemo((): SchemaData | null => {
		if (!editorActiveElement) return null;
		switch (editorActiveElement.selectType) {
			case "component":
				return getComponentData;
			case "container":
				return getContainerData;
			case "element":
				return getElementData;
			default:
				return null;
		}
	}, [
		editorActiveElement,
		getComponentData,
		getContainerData,
		getElementData,
	]);

	const getActiveWidgetData = useMemo((): ISchemaComponent | null => {
		try {
			// Проверка на наличие widgetActiveId и компонентов
			if (!editorActiveElement?.widgetActiveId || !getComponentData)
				return null;

			// Проверка на наличие widgets и data
			const widgetComponents =
				getComponentData?.widgets?.data?.components;
			if (!widgetComponents || !Array.isArray(widgetComponents))
				return null;

			// Поиск нужного виджета
			const widgetData = widgetComponents.find(
				(widget: ISchemaComponent) => {
					return (
						widget?.id ===
						editorActiveElement?.selectWidgetComponentId
					);
				}
			);

			return widgetData || null;
		} catch (error) {
			toastMessage(
				"Ошибка в foundComponentData в useActiveElementObserver",
				"error"
			);
			errorHandler(
				"useActiveElementObserver",
				"foundComponentData",
				error
			);
			return null;
		}
	}, [editorActiveElement, getComponentData]);

	const getActiveElementData = useMemo((): ISchemaComponent | null => {
		try {
			// Проверка на наличие widgetActiveId и компонентов
			if (!editorActiveElement?.widgetActiveId || !getComponentData)
				return null;

			// Проверка на наличие widgets и data
			const widgetComponents =
				getComponentData?.widgets?.data?.components;
			if (!widgetComponents || !Array.isArray(widgetComponents))
				return null;

			// Поиск нужного виджета
			const widgetData = widgetComponents.find(
				(widget: ISchemaComponent) => {
					if (widget.id === editorActiveElement?.selectComponentId) {
						if (widget.elements) {
							widget.elements.map((widgetElement) => {
								return (
									widgetElement.id ===
									editorActiveElement?.selectWidgetActiveId
								);
							});
						}
					}
				}
			);

			return widgetData || null;
		} catch (error) {
			toastMessage(
				"Ошибка в foundComponentData в useActiveElementObserver",
				"error"
			);
			errorHandler(
				"useActiveElementObserver",
				"foundComponentData",
				error
			);
			return null;
		}
	}, [editorActiveElement, getComponentData]);

	return useMemo((): IActiveElementObserver | null => {
		if (!editorActiveElement) return null;

		return {
			selectType: editorActiveElement?.selectType as ActiveElementType,
			selectComponentId: getComponentData?.id ?? "",
			selectContainerId: getContainerData?.id ?? "",
			selectElementId: getElementData?.id ?? "",
			selectActiveId: editorActiveElement?.selectActiveId ?? "",
			selectComponentData: getComponentData ?? null,
			selectContainerData: getContainerData ?? null,
			selectElementData: getElementData ?? null,
			selectActiveData: getActiveData ?? null,
			selectWidgetData:
				getComponentData?.widgets?.data?.components ?? null,
			selectWidgetActiveData: getActiveWidgetData ?? null,
			selectWidgetActiveType:
				editorActiveElement?.selectWidgetActiveType ?? "none",
			selectWidgetIsEditing:
				(getComponentData?.widgets?.data && dialog.dialogWidget.open) ||
				false,
			selectWidgetActiveId:
				editorActiveElement?.selectWidgetActiveId ?? "",
			selectWidgetComponentId:
				editorActiveElement?.selectWidgetComponentId ?? "",
			selectWidgetElementId: getActiveElementData?.id ?? "",
		};
	}, [
		editorActiveElement,
		getComponentData,
		getContainerData,
		getElementData,
		getActiveData,
		getActiveWidgetData,
		getActiveElementData,
	]);
}
