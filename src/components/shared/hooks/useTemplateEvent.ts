import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { TemplateBlockType } from "@/components/shared/types/types-components";
import { v4 as uuidv4 } from "uuid";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { versionTemplate } from "@/components/app/versions/version-modules";
import { IComponentBaseSchema } from "@/components/shared/types/interface-templates";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IComponentBaseFullSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { defaultSettings } from "@/components/entities/defSettings/def_settings";

interface ITemplateEvent {
	create: (
		blockType: TemplateBlockType,
		countColumn: number,
		cb: () => void
	) => void;
	addComponent: (data: IComponentBaseSchema) => void;
	deleteContainer: (id: string) => void;
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
	const create = (
		blockType: TemplateBlockType,
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
				return {};
			}
			if (blockType === "swiper") {
				return {
					swiper: defaultSettings.CONTAINERS.swiper,
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

	return {
		create,
		addComponent,
		deleteContainer,
	};
}
