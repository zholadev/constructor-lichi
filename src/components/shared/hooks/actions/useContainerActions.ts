import {
	IContainerType,
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
		blockType: IContainerType,
		countColumn: number,
		version: string,
		cb: () => void
	) => void;
	createSaintLaurentContainerEvent: (
		type: IContainerType,
		componentType: ISaintLaurentComponentType,
		versionContainer: string,
		versionComponent: string,
		cb: () => void
	) => void;
	createCategoryListContainerEvent: (
		type: IContainerType,
		params: ISchemaSettingCategoryListParams,
		version: string,
		cb: () => void
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
export default function useContainerActions(): IContainerActions {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const createBaseContainer = (
		blockType: IContainerType,
		countColumn: number,
		version: string,
		cb: () => void
	) => {
		if (!version) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

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
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: blockType,
			version,
			style: generateStyles(),
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
	 * @param cb
	 */
	const createSaintLaurentContainerEvent = (
		type: IContainerType,
		componentType: ISaintLaurentComponentType,
		versionContainer: string,
		versionComponent: string,
		cb: () => void
	) => {
		if (!versionContainer) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

		if (type === "initial") {
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
					justifyContent: "center",
					alignItems: "center",
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
				...saint_laurent_component_schema(versionComponent),
			}));
		};

		const newTemplate: ISchemaContainer = {
			id: uuidv4(),
			guid: uuidv4(),
			type: "saint_laurent_container",
			version: versionContainer,
			style: generateStyles(),
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
	 * @param params
	 * @param cb
	 */
	const createCategoryListContainerEvent = (
		type: IContainerType,
		params: ISchemaSettingCategoryListParams,
		version: string,
		cb: () => void
	) => {
		if (!version) {
			toastMessage("Вы не выбрали версию контейнера!", "error");
			return;
		}

		if (type === "initial") {
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
			// @ts-ignore
			settings: {
				swiper: defaultSettings.CONTAINERS.swiper,
				view: {
					darkTheme: true,
				},
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
