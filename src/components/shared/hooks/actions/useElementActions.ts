import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface IElementActions {
	elementCreate: (data: IElementTotal) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 06.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useElementActions(): IElementActions {
	const toastMessage = useToastMessage();
	const activeElementHandle = useActiveElement();
	const dialog = useDialogAction();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента в компонент
	 * @param data
	 */
	const elementCreate = (data: IElementTotal) => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлений - data не найдено в addElement",
					"error"
				);
				return;
			}

			if (!activeElementData?.activeId) {
				toastMessage(
					"Вы не выбрали активный элемент в addElement",
					"error"
				);
				return;
			}

			if (!activeElementData?.componentId) {
				toastMessage(
					"Вы не выбрали активный компонент в addElement",
					"error"
				);
				return;
			}

			if (!activeElementData?.componentId) {
				toastMessage("componentId не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ISchemaContainer) => {
					if (container.id === activeElementData.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									if (
										component.data.id ===
										activeElementData?.componentId
									) {
										return {
											...component,
											data: {
												...component.data,
												elements: [
													...component.data.elements,
													data,
												],
											},
										};
									}
									return component;
								}
							),
						};
					}
					return container;
				}
			);

			if (newBuildData) spaceTemplateDataAction(newBuildData);
		} catch (error) {
			return errorHandler("useEditorEvent", "addElement", error);
		}
	};

	return {
		elementCreate,
	};
}
