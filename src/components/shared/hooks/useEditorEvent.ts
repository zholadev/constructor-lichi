import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface IEditorEvent {
	addElement: (type: string) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useEditorEvent(): IEditorEvent {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const addElement = (data: any) => {
		try {
			if (!editorActiveElement) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!editorActiveElement.id) {
				toastMessage("Выбранный id не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ITemplateBaseSchema) => {
					if (container.id === editorActiveElement.containerId) {
						return {
							...container,
							components: container.components.map(
								(component) => {
									if (
										component.data.id ===
										editorActiveElement.id
									) {
										return {
											...component,
											is_selected: true,
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
			console.log("newBuildData", newBuildData);
			if (newBuildData) spaceTemplateDataAction(newBuildData);
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};
	return {
		addElement,
	};
}
