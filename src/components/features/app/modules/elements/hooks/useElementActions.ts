import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { errorMessage } from "@/components/shared/constants/text";

interface IElementActions {
	elementCreate: (data: ISchemaElementInterfaces) => void;
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
	const { spaceTemplateDataAction } = useDispatchAction();
	const { containerUpdateWrapper } = useUpdateContainerWrapper();
	const activeElementData = useActiveElementObserver();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления элемента в компонент
	 * @param data
	 */
	const elementCreate = (data: ISchemaElementInterfaces): void => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлений - data не найдено в elementCreate - useElementActions",
					"error"
				);
				return;
			}

			if (!activeElementData?.selectActiveId) {
				toastMessage(
					"Вы не выбрали активный элемент в elementCreate - useElementActions",
					"error"
				);
				return;
			}

			if (!activeElementData?.selectComponentId) {
				toastMessage("componentId не найден", "error");
				return;
			}

			const updateData = containerUpdateWrapper((component) => {
				if (component?.id === activeElementData?.selectComponentId) {
					return {
						...component,
						elements: [...component.elements, data],
					};
				}
				return component;
			});

			if (updateData) {
				toastMessage(
					"Элемент был успешно создан! elementCreate - useElementActions",
					"success"
				);
				spaceTemplateDataAction(updateData);
			}
		} catch (error) {
			toastMessage(
				`${errorMessage}! elementCreate - useElementActions`,
				"error"
			);
			errorHandler("useElementActions", "elementCreate", error);
		}
	};

	return {
		elementCreate,
	};
}
