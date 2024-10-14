import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import {
	deepCopy,
	deleteMultiplePaths,
	updateObjectByPath,
} from "@/components/shared/utils/schema-helpers";
import { errorMessage } from "@/components/shared/constants/text";

interface IUpdateActions {
	update: (
		data: unknown,
		pathString: string | string[],
		removeObj?: boolean,
		removeKey?: boolean,
		save?: boolean
	) => void;
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
export default function useUpdateActions(): IUpdateActions {
	const toastMessage = useToastMessage();
	const { spaceTemplateDataAction } = useDispatchAction();
	const activeElementData = useActiveElementObserver();

	const { containerUpdateWrapper } = useUpdateContainerWrapper();

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const update = (
		newValue: unknown,
		pathString: string | string[],
		removeObj: boolean = false,
		removeKey: boolean = false,
		save: boolean = true
	) => {
		try {
			if (!newValue) {
				toastMessage(
					"Произошла ошибка при добавлений - not found value - useUpdateActions",
					"error"
				);
				return;
			}

			if (!activeElementData?.activeId) {
				toastMessage("activeId не найден в updateComponent", "error");
				return;
			}

			const updateObjectByPathHandle = (
				data: any,
				save: boolean,
				remove?: boolean
			) => {
				return updateObjectByPath(
					data,
					pathString,
					newValue,
					save,
					remove
				);
			};

			const updateDataHandle = (
				container: ISchemaContainer,
				save: boolean,
				remove?: boolean
			) => {
				updateObjectByPathHandle(container, save, remove);

				if (removeObj) {
					toastMessage("Успешно удалено!", "success");
				} else {
					toastMessage(
						`Успешно обновлено! ${activeElementData.type}`,
						"success"
					);
				}
			};

			const removeKeyDataHandle = (container: ISchemaContainer) => {
				deleteMultiplePaths(container, pathString);
				toastMessage("Успешно удалено!", "success");
			};

			/**
			 * @author Zholaman Zhumanov
			 * @description Метод для обновления контейнера
			 */
			const containerUpdateHandle = () => {
				try {
					return spaceTemplateData.map(
						(container: ISchemaContainer) => {
							if (
								container.id === activeElementData.containerId
							) {
								const updatedContainer = deepCopy(container);

								if (removeObj) {
									updateDataHandle(
										updatedContainer,
										false,
										true
									);
								} else if (removeKey) {
									removeKeyDataHandle(updatedContainer);
								} else {
									updateDataHandle(updatedContainer, true);
								}

								return {
									...container,
									...updatedContainer,
								};
							}
							return container;
						}
					);
				} catch (error) {
					toastMessage(
						`${errorMessage}! containerUpdateHandle - useUpdateActions`,
						"error"
					);
					return errorHandler(
						"useUpdateActions",
						"containerUpdateHandle",
						error
					);
				}
			};

			/**
			 * @author Zholaman Zhumanov
			 * @description Метод для обновления компонентов
			 */
			const componentUpdateHandle = () => {
				try {
					return containerUpdateWrapper((component) => {
						if (component?.id === activeElementData?.componentId) {
							const updatedComponent = deepCopy(component);
							console.log("updatedComponent", updatedComponent);
							if (removeObj) {
								console.log("removeObj");
								updateDataHandle(updatedComponent, true, true);
							} else if (removeKey) {
								removeKeyDataHandle(updatedComponent);
							} else {
								updateDataHandle(updatedComponent, save);
							}

							return {
								...component,
								...updatedComponent,
							};
						}
						return component;
					});
				} catch (error) {
					toastMessage(
						`${errorMessage}! componentUpdateHandle - useUpdateActions`,
						"error"
					);
					return errorHandler(
						"useUpdateActions",
						"componentUpdateHandle",
						error
					);
				}
			};

			/**
			 * @author Zholaman Zhumanov
			 * @description Метод для обновления элемента
			 */
			const elementUpdateHandle = () => {
				try {
					return containerUpdateWrapper((component) => {
						if (component.id === activeElementData?.componentId) {
							const updatedComponent = deepCopy(component);

							const elementIndex =
								updatedComponent.elements.findIndex(
									(el: IElementTotal) =>
										el.id === activeElementData.activeId
								);

							if (elementIndex !== -1) {
								if (removeObj) {
									updateDataHandle(
										updatedComponent.elements[elementIndex],
										true,
										true
									);
								} else if (removeKey) {
									removeKeyDataHandle(
										updatedComponent.elements[elementIndex]
									);
								} else {
									updateDataHandle(
										updatedComponent.elements[elementIndex],
										save
									);
								}

								return {
									...component,
									...updatedComponent,
								};
							}

							return component;
						}
						return component;
					});
				} catch (error) {
					toastMessage(
						`${errorMessage}! elementUpdateHandle - useUpdateActions`,
						"error"
					);
					return errorHandler(
						"useUpdateActions",
						"elementUpdateHandle",
						error
					);
				}
			};

			if (activeElementData.type === "container") {
				const newUpdateContent = containerUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.type === "component") {
				const newUpdateContent = componentUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData.type === "element") {
				const newUpdateContent = elementUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else {
				toastMessage("Тип не распознан!", "error");
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useEditorEvent", "addElement", error);
			}
		}
	};

	return {
		update,
	};
}
