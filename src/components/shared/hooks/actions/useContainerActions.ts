import {
	DisplayContainerType,
	ISaintLaurentComponentType,
} from "@/components/shared/types/types";
import { ISchemaSettingCategoryListParams } from "@/components/shared/types/interface-schema-settings";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { v4 as uuidv4 } from "uuid";
import { defaultSettings } from "@/components/entities/defSettings/def_settings";
import { saint_laurent_component_schema } from "@/components/app/schema/model/v1/schema-special-components";

interface IContainerActions {
	createBaseContainer: (
		blockType: DisplayContainerType,
		countColumn: number,
		version: string,
		cb: () => void
	) => void;
	createSaintLaurentContainerEvent: (
		type: DisplayContainerType,
		componentType: ISaintLaurentComponentType,
		versionContainer: string,
		versionComponent: string,
		countComponent: number,
		cb: () => void
	) => void;
	createCategoryListContainerEvent: (
		type: DisplayContainerType,
		params: ISchemaSettingCategoryListParams,
		version: string,
		cb: () => void
	) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 06.10.2024
 * @description Хук для создания контейнеров
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useContainerActions(): IContainerActions {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция для добавления обычных контейнеров в доску
	 */
	const createBaseContainer = (
		blockType: DisplayContainerType,
		countColumn: number,
		version: string,
		cb: () => void
	) => {
		if (!version) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

		if (!blockType) {
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

			if (blockType === "block") {
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
			if (blockType === "block") {
				return {
					...defaultSettings.CONTAINERS.container.block,
				};
			}
			if (blockType === "swiper") {
				return {
					...defaultSettings.CONTAINERS.container.swiper,
				};
			}
		};

		const createChildren = () => {
			return Array.from({ length: countColumn }, () => ({
				id: uuidv4(),
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "container",
			version,
			style: generateStyles(),
			display: blockType,
			// @ts-ignore
			components: createChildren(),
			// @ts-ignore
			settings: generateSettings(),
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания контейнера для saint laurent типа
	 * @param type
	 * @param componentType
	 * @param versionContainer
	 * @param versionComponent
	 * @param countComponent
	 * @param cb
	 */
	const createSaintLaurentContainerEvent = (
		type: DisplayContainerType,
		componentType: ISaintLaurentComponentType,
		versionContainer: string,
		versionComponent: string,
		countComponent: number,
		cb: () => void
	) => {
		if (!versionContainer) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

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

			if (type === "block") {
				return {
					...commonStyles,
					display: "grid",
					gap: "60px",
					justifyContent: "center",
					alignItems: "center",
					gridTemplateColumns: createTemplateColumns() ?? "",
				};
			}
			if (type === "swiper") {
				return {
					...commonStyles,
				};
			}

			return commonStyles;
		};

		const generateSettings = () => {
			if (type === "block") {
				return {
					...defaultSettings.CONTAINERS.saint_laurent_container.block,
				};
			}
			if (type === "swiper") {
				return {
					...defaultSettings.CONTAINERS.saint_laurent_container
						.swiper,
				};
			}
		};

		const createChildren = () => {
			if (type === "swiper") {
				return Array.from({ length: countComponent }, () => ({
					...saint_laurent_component_schema(versionComponent),
					id: uuidv4(),
				}));
			}

			return Array.from({ length: componentCount }, () => ({
				...saint_laurent_component_schema(versionComponent),
				id: uuidv4(),
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "saint_laurent_container",
			version: versionContainer,
			display: type,
			style: generateStyles(),
			components: createChildren(),
			// @ts-ignore
			settings: generateSettings(),
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для создания контейнера для saint laurent типа
	 * @param blockType
	 * @param params
	 * @param version
	 * @param cb
	 */
	const createCategoryListContainerEvent = (
		blockType: DisplayContainerType,
		params: ISchemaSettingCategoryListParams,
		version: string,
		cb: () => void
	) => {
		if (!version) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

		if (!blockType) {
			toastMessage("Вы не выбрали тип контейнера!", "error");
			return;
		}

		const generateStyles = () => {
			const commonStyles = {
				margin: "0 0 2px 0",
				backgroundColor: "#ffffff",
				backgroundColorDark: "#181a1b",
			};

			return {
				...commonStyles,
				display: "block",
			};
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "category_list_container",
			version,
			style: generateStyles(),
			display: "swiper",
			// @ts-ignore
			settings: {
				...defaultSettings.CONTAINERS.category_list_container,
				categoryList: params || {},
			},
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	return {
		createBaseContainer,
		createSaintLaurentContainerEvent,
		createCategoryListContainerEvent,
	};
}
