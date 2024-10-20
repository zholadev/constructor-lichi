import {
	DisplayContainerType,
	ISaintLaurentComponentType,
} from "@/components/shared/types/types";
import { ISchemaSettingCategoryListParams } from "@/components/shared/types/interface-schema-settings";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	ISchemaBaseContainer,
	ISchemaContainer,
} from "@/components/shared/types/interface-schema-container";
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

	const generateStyles = (
		blockType: DisplayContainerType,
		commonStyles: Record<string, unknown>,
		templateColumns?: number[]
	): Record<string, unknown> => {
		if (blockType === "block") {
			return {
				...commonStyles,
				display: "grid",
				gap: 2,
				gridTemplateColumns: templateColumns || "",
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

	const validateInputs = (
		version: string,
		blockType: DisplayContainerType
	) => {
		if (!version) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return false;
		}
		if (!blockType) {
			toastMessage("Вы не выбрали тип блока!", "error");
			return false;
		}
		return true;
	};

	const getCommonStyles = (): Record<string, unknown> => ({
		margin: [0, 0, 2, 0],
		backgroundColor: "#ffffff",
		backgroundColorDark: "#181a1b",
	});

	const createChildren = (count: number): Array<{ id: string }> => {
		return Array.from({ length: count }, () => ({ id: uuidv4() }));
	};

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
		if (!validateInputs(version, blockType)) return;

		const templateColumns = Array(countColumn).fill(1);
		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "container",
			version,
			style: generateStyles(
				blockType,
				getCommonStyles(),
				templateColumns
			),
			display: blockType,
			// @ts-ignore
			components: createChildren(countColumn),
			settings:
				blockType === "block"
					? defaultSettings.CONTAINERS.container.block
					: defaultSettings.CONTAINERS.container.swiper,
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
		if (!validateInputs(versionContainer, type)) return;

		const staticCount = componentType === "duo" ? 2 : 1;
		const templateColumns = Array(staticCount).fill(1);

		const generateStylesSaint = (): Record<string, unknown> => {
			const commonStyles = {
				margin: [0, 0, 2, 0],
				backgroundColor: "#ffffff",
				backgroundColorDark: "#181a1b",
			};

			if (type === "block") {
				return {
					...commonStyles,
					display: "grid",
					gap: 60,
					justifyContent: "center",
					alignItems: "center",
					gridTemplateColumns: templateColumns ?? "",
				};
			}

			return commonStyles;
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "saint_laurent_container",
			version: versionContainer,
			display: type,
			style: generateStylesSaint(),
			components: Array.from(
				{ length: type === "swiper" ? countComponent : staticCount },
				() => ({
					...saint_laurent_component_schema(versionComponent),
					id: uuidv4(),
				})
			),
			settings:
				type === "block"
					? defaultSettings.CONTAINERS.saint_laurent_container.block
					: defaultSettings.CONTAINERS.saint_laurent_container.swiper,
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
		if (!validateInputs(version, blockType)) return;

		const newTemplate: ISchemaBaseContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "category_list_container",
			version,
			display: "swiper",
			style: generateStyles(blockType, getCommonStyles()),
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
