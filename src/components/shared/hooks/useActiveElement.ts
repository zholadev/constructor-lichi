import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { ActiveElementType, SchemaData } from "@/components/shared/types/types";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface IActiveElement {
	selectType: ActiveElementType;
	selectContainerId: string;
	selectComponentId: string;
	selectElementId: string;
	selectActiveId: string;
	selectActiveData: SchemaData | null;
	selectWidgetActiveData: ISchemaComponent | ISchemaElementInterfaces | null;
	selectWidgetActiveId: string;
	selectWidgetActiveType: ActiveElementType;
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
	params: IActiveElement
) => IActiveElement | null {
	const { editorActiveElementAction } = useDispatchAction();

	const toastMessage = useToastMessage();

	return ({
		selectType,
		selectWidgetActiveId,
		selectActiveId,
		selectActiveData,
		selectComponentId,
		selectElementId,
		selectContainerId,
		selectWidgetActiveData,
		selectWidgetActiveType,
	}: IActiveElement): IActiveElement | null => {
		// Проверка на наличие данных
		if (!selectActiveData || !selectContainerId || !selectType) {
			toastMessage(
				"Ошибка! Параметр не найден! useActiveElement",
				"error"
			);
			return null;
		}

		// Вызов действия для обновления активного элемента
		editorActiveElementAction({
			selectType,
			selectWidgetActiveId,
			selectActiveId,
			selectActiveData,
			selectComponentId,
			selectElementId,
			selectContainerId,
			selectWidgetActiveData,
			selectWidgetActiveType,
		});

		// Возвращаем объект элементов
		return {
			selectType,
			selectWidgetActiveId,
			selectActiveId,
			selectActiveData,
			selectComponentId,
			selectElementId,
			selectContainerId,
			selectWidgetActiveData,
			selectWidgetActiveType,
		};
	};
}
