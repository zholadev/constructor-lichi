import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useUpdateContainerWrapper from "@/components/shared/hooks/actions/useUpdateContainerWrapper";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import {
	deepCopy,
	deleteMultiplePaths,
	removeObjectByPath,
	updateObjectByPath,
} from "@/components/shared/utils/schema-helpers";
import { errorMessage } from "@/components/shared/constants/text";

interface IUpdateActions {
	update: (
		data: unknown,
		pathString: string,
		pathMultiString: string[],
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
		pathString: string,
		pathMultiString: string[],
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

			if (!activeElementData?.selectActiveId) {
				toastMessage("activeId не найден в updateComponent", "error");
				return;
			}

			const updateObjectByPathHandle = (
				data: any,
				path: string,
				saveData: boolean
			) => {
				return updateObjectByPath(data, path, newValue, saveData);
			};

			const updateDataHandle = (
				data: any,
				path: string,
				saveData: boolean
			) => {
				updateObjectByPathHandle(data, path, saveData);

				toastMessage(
					`Успешно обновлено! ${activeElementData?.selectType}`,
					"success"
				);
			};

			const removeObjectHandle = (data: any, path: string) => {
				removeObjectByPath(data, path);
				toastMessage("Успешно удалено!", "success");
			};

			const removeKeyDataHandle = (data: any) => {
				deleteMultiplePaths(data, pathMultiString);
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
								container?.id ===
								activeElementData?.selectContainerId
							) {
								const updatedContainer = deepCopy(container);

								if (removeObj) {
									removeObjectHandle(
										updatedContainer,
										pathString
									);
								} else if (removeKey) {
									removeKeyDataHandle(updatedContainer);
								} else {
									updateDataHandle(
										updatedContainer,
										pathString,
										true
									);
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
						if (
							component?.id ===
							activeElementData?.selectComponentId
						) {
							const updatedComponent = deepCopy(component);
							if (removeObj) {
								removeObjectByPath(
									updatedComponent,
									pathString
								);
							} else if (removeKey) {
								removeKeyDataHandle(updatedComponent);
							} else {
								updateDataHandle(
									updatedComponent,
									pathString,
									save
								);
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
						if (
							component?.id ===
							activeElementData?.selectComponentId
						) {
							const updatedComponent = deepCopy(component);

							const elementIndex =
								updatedComponent.elements.findIndex(
									(el: ISchemaElementInterfaces) =>
										el.id ===
										activeElementData.selectActiveId
								);

							if (elementIndex !== -1) {
								if (removeObj) {
									removeObjectHandle(
										updatedComponent.elements[elementIndex],
										pathString
									);
								} else if (removeKey) {
									removeKeyDataHandle(
										updatedComponent.elements[elementIndex]
									);
								} else {
									updateDataHandle(
										updatedComponent.elements[elementIndex],
										pathString,
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

			if (activeElementData?.selectType === "container") {
				const newUpdateContent = containerUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData?.selectType === "component") {
				const newUpdateContent = componentUpdateHandle();
				if (newUpdateContent) spaceTemplateDataAction(newUpdateContent);
			} else if (activeElementData?.selectType === "element") {
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
