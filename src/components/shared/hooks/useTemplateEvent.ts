import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { v4 as uuidv4 } from "uuid";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { versionTemplate } from "@/components/app/versions/version-modules";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { defaultSettings } from "@/components/entities/defSettings/def_settings";
import {
	IContainerType,
	ISaintLaurentComponentType,
} from "@/components/shared/types/types";
import { saint_laurent_component_schema } from "@/components/entities/schema/model/v1/schema-special-components";

interface ITemplateEvent {
	createBaseContainer: (
		blockType: IContainerType,
		countColumn: number,
		cb: () => void
	) => void;
	addComponent: (data: IComponentBaseFullSchema) => void;
	deleteContainer: (id: string) => void;
	createSaintLaurentContainerEvent: (
		type: IContainerType,
		componentType: ISaintLaurentComponentType,
		cb: () => void
	) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, gap update for swiper
 * @fixme
 * @constructor
 */
export default function useTemplateEvent(): ITemplateEvent {
	const { editorRemoveTemplateAction } = useDispatchAction();

	const toggleEditorRemoveTemplateHandle = () =>
		editorRemoveTemplateAction(!editorRemoveTemplate);

	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorSelectAddComponent, editorRemoveTemplate } = useAppSelector(
		(state) => state.editor
	);

	const addComponent = (updateData: IComponentBaseFullSchema) => {
		if (!updateData) {
			toastMessage(
				"Такого компонента не существует! addComponent",
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
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const createBaseContainer = (
		blockType: IContainerType,
		countColumn: number,
		cb: () => void
	) => {
		if (blockType === "initial") {
			toastMessage("Вы не выбрали тип блока!", "error");
			return;
		}

		const createTemplateColumns = () =>
			Array(countColumn).fill("1fr").join(" ");

		const generateStyles = () => {
			const commonStyles = {
				margin: "0 0 2px 0",
				backgroundColor: "#ffffff",
				backgroundColorDark: "rgb(24, 26, 27)",
			};

			if (blockType === "container") {
				return {
					...commonStyles,
					display: "grid",
					gap: "2px",
					gridTemplateColumns: createTemplateColumns() ?? "",
				};
			}
			if (blockType === "swiper") {
				return {
					...commonStyles,
					display: "block",
				};
			}

			return commonStyles;
		};

		const generateSettings = () => {
			if (blockType === "container") {
				return {
					view: {
						darkTheme: true,
					},
				};
			}
			if (blockType === "swiper") {
				return {
					swiper: defaultSettings.CONTAINERS.swiper,
					view: {
						darkTheme: true,
					},
				};
			}
		};

		const createChildren = () => {
			return Array.from({ length: countColumn }, () => ({
				id: uuidv4(),
				data: [],
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: blockType,
			version: versionTemplate.version,
			style: generateStyles(),
			// @ts-ignore
			components: createChildren(),
			// @ts-ignore
			settings: generateSettings(),
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	const deleteContainer = (id: string) => {
		if (!id) {
			toastMessage(
				"Произошла ошибка id не найдено, обратитесь разработчику",
				"error"
			);
			return;
		}

		const filteredRemovedData = spaceTemplateData.filter(
			(item: ISchemaContainer) => item.id !== id
		);
		spaceTemplateDataAction(filteredRemovedData);
		toggleEditorRemoveTemplateHandle();
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания контейнера для saint laurent типа
	 * @param type
	 * @param componentType
	 * @param cb
	 */
	const createSaintLaurentContainerEvent = (
		type: IContainerType,
		componentType: ISaintLaurentComponentType,
		cb: () => void
	) => {
		if (!type) {
			toastMessage("Вы не выбрали тип контейнера!", "error");
			return;
		}

		const componentCount: number = componentType === "duo" ? 2 : 1;

		const createTemplateColumns = () =>
			Array(componentCount).fill("1fr").join(" ");

		const generateStyles = () => {
			const commonStyles = {
				margin: "0 0 2px 0",
				backgroundColor: "#ffffff",
				backgroundColorDark: "#181a1b",
			};

			if (type === "container") {
				return {
					...commonStyles,
					display: "grid",
					gap: "60px",
					gridTemplateColumns: createTemplateColumns() ?? "",
				};
			}
			if (type === "swiper") {
				return {
					...commonStyles,
					display: "block",
				};
			}

			return commonStyles;
		};

		const generateSettings = () => {
			if (type === "container") {
				return {
					view: {
						darkTheme: true,
						heightFull: true,
					},
				};
			}
			if (type === "swiper") {
				return {
					swiper: defaultSettings.CONTAINERS.swiper,
					view: {
						darkTheme: true,
						heightFull: true,
					},
				};
			}
		};

		const createChildren = () => {
			return Array.from({ length: componentCount }, () => ({
				id: uuidv4(),
				data: saint_laurent_component_schema(),
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "saint_laurent_container",
			version: versionTemplate.version,
			style: generateStyles(),
			// @ts-ignore
			components: createChildren(),
			// @ts-ignore
			settings: generateSettings(),
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	return {
		createBaseContainer,
		addComponent,
		deleteContainer,
		createSaintLaurentContainerEvent,
	};
}
