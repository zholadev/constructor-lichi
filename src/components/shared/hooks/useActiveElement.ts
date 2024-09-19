import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import {
	IComponentCardSchema,
	IComponentCardVideoSchema,
} from "@/components/features/app/blocks/types/interface-components";
import { ActiveElementType } from "@/components/shared/types/types";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";

interface IElementActiveParams {
	data: IComponentCardSchema | IComponentCardVideoSchema | IElementTotal;
	containerId: string;
	type: ActiveElementType;
	currentId: string;
	componentId: string;
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

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return ({
		data,
		containerId,
		type,
		currentId,
		componentId,
	}: IElementActiveParams) => {
		if (!data || !containerId || !type) {
			toastMessage(
				`Ошибка! ${!containerId ? "containerId" : !currentId ? "currentId" : !componentId ? "componentId" : !data ? "data" : !type ? "type" : "unknown"} не найдено!`,
				"error"
			);
			return;
		}
		editorActiveElementAction({
			id: componentId,
			containerId,
			type,
			style: data?.style,
			componentData: data,
			currentActiveId: currentId,
		});
	};
}
