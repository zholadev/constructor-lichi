import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface IComponentActions {
	componentAppend: (data: unknown) => void;
	componentCreate: (data: unknown) => void;
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
	const activeElementHandle = useActiveElement();
	const dialog = useDialogAction();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorActiveElement, editorSelectAddComponent } = useAppSelector(
		(state) => state.editor
	);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания компонента в контейнере
	 * @param updateData
	 */
	const componentCreate = (updateData: ISchemaComponent) => {
		if (!updateData) {
			toastMessage(
				"Такого компонента не существует! componentCreate - useComponentActions",
				"error"
			);
			return;
		}
		const selected = editorSelectAddComponent;
		const data = spaceTemplateData.map((container: ISchemaContainer) => {
			if (container.id === selected.containerData.id) {
				return {
					...container,
					components: container.components.map((component) => {
						if (component.id === selected.componentId) {
							return {
								...component,
								data: updateData,
							};
						}
						return component;
					}),
				};
			}
			return container;
		});
		spaceTemplateDataAction(data);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для добавления компонента в существующий контейнер
	 * @param data
	 */
	const componentAppend = (data: unknown): ISchemaContainer[] | void => {
		try {
			if (!data) {
				toastMessage(
					"Произошла ошибка при добавлении - not found",
					"error"
				);
				return;
			}

			if (!activeElementData?.activeId) {
				toastMessage("Вы не выбрали компонент", "error");
				return;
			}

			if (!activeElementData?.containerId) {
				toastMessage("Выбранный контейнер не найден", "error");
				return;
			}

			const newBuildData = spaceTemplateData.map(
				(container: ISchemaContainer) => {
					if (container.id === activeElementData.containerId) {
						// Добавляем новый компонент
						const updatedComponents = [
							...container.components,
							{
								id: uuidv4(),
								data: {
									...data,
								},
							},
						];

						// Обновляем gridTemplateColumns на основе количества компонентов
						const gridTemplateColumns = `repeat(${updatedComponents.length}, 1fr)`;

						if (
							container.type === "swiper" ||
							container.type === "category_list_container"
						) {
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
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	return {
		componentAppend,
		componentCreate,
	};
}
