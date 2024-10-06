import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import {
	ActiveElementType,
	TotalComponentTypes,
	WidgetTypes,
} from "@/components/shared/types/types";

interface IElementActiveParams {
	type: ActiveElementType;
	containerId: string;
	componentId?: string;
	elementId?: string;
	activeId: string;
	activeData: TotalComponentTypes;
	widgetData?: TotalComponentTypes;
	widgetType?: WidgetTypes;
	widgetActiveComponentId?: string;
	widgetActiveElementId?: string;
	widgetActiveType?: ActiveElementType;
	widgetActiveData?: TotalComponentTypes;
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
export default function useActiveElement(): (
	params: IElementActiveParams
) => void {
	const { editorActiveElementAction } = useDispatchAction();

	const toastMessage = useToastMessage();

	return ({
		type,
		containerId,
		componentId,
		elementId,
		activeId,
		activeData,
		widgetData,
		widgetType,
		widgetActiveData,
		widgetActiveComponentId,
		widgetActiveElementId,
		widgetActiveType,
	}: IElementActiveParams) => {
		if (!activeData || !containerId || !type) {
			toastMessage(
				"Ошибка! параметр не найдено! useActiveElement",
				"error"
			);
			return;
		}
		editorActiveElementAction({
			type,
			containerId,
			componentId,
			elementId,
			activeId,
			activeData,
			widgetData,
			widgetType,
			widgetActiveData,
			widgetActiveComponentId,
			widgetActiveElementId,
			widgetActiveType,
		});
	};
}
