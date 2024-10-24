import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { errorMessage } from "@/components/shared/constants/text";

interface IComponentActions {
	componentAppend: (data: ISchemaComponent) => void;
	componentCreate: (data: ISchemaComponent) => void;
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
export default function useComponentActions(): IComponentActions {
	const toastMessage = useToastMessage();
	const { spaceTemplateDataAction } = useDispatchAction();
	const { containerUpdateWrapper } = useUpdateContainerWrapper();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorSelectAddComponent } = useAppSelector(
		(state) => state.editor
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания компонента в контейнере
	 * @param data
	 */
	const componentCreate = (data: ISchemaComponent) => {
		if (!data) {
			toastMessage(
				"Такого компонента не существует! componentCreate - useComponentActions",
				"error"
			);
			return;
		}

		const updateData = containerUpdateWrapper((component) => {
			if (component.id === editorSelectAddComponent?.componentId) {
				return {
					...component,
					...data,
				};
			}
			return component;
		});

		if (updateData) {
			toastMessage(
				"Компонент успешно добавлен! componentCreate - useComponentActions",
				"success"
			);
			spaceTemplateDataAction(updateData);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления компонента в существующий контейнер
	 * @param data
	 */
	const componentAppend = (data: ISchemaComponent): void => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлении - not found",
					"error"
				);
				return;
			}

			if (!activeElementData?.selectActiveId) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData?.selectContainerId) {
				toastMessage("Выбранный контейнер не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ISchemaContainer) => {
					if (container.id === activeElementData.selectContainerId) {
						// Добавляем новый компонент
						const updatedComponents = [
							...container.components,
							{
								...data,
								id: uuidv4(),
							},
						];

						// Обновляем gridTemplateColumns на основе количества компонентов
						const gridTemplateColumns = `repeat(${updatedComponents.length}, 1fr)`;

						if (container.type === "category_list_container") {
							return {
								...container,
								components: updatedComponents,
								style: {
									...container.style,
								},
							};
						}

						return {
							...container,
							components: updatedComponents,
							style: {
								...container.style,
								gridTemplateColumns,
							},
						};
					}
					return container;
				}
			);

			if (newBuildData) {
				toastMessage("Компонент был успешно добавлен!", "success");
				spaceTemplateDataAction(newBuildData);
			}
		} catch (error) {
			toastMessage(
				`${errorMessage}! componentAppend - useComponentActions`,
				"error"
			);
			errorHandler("useComponentActions", "componentAppend", error);
		}
	};

	return {
		componentAppend,
		componentCreate,
	};
}
