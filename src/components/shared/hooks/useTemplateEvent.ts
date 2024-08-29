import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { TemplateBlockType } from "@/components/shared/types/types-components";
import { v4 as uuidv4 } from "uuid";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { versionTemplate } from "@/components/app/versions/version-modules";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useTemplateEvent(): any {
	const toastMessage = useToastMessage();

	const { spaceTemplateDataAction } = useDispatchAction();

	const { spaceTemplateData } = useAppSelector((state) => state.space);

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
			const isGridBlock = countColumn > 1 && blockType === "block";
			return {
				display: isGridBlock ? "grid" : "block",
				gap: isGridBlock ? "2px" : undefined,
				gridTemplateColumns: isGridBlock
					? createTemplateColumns()
					: undefined,
				marginBottom: "2px",
			};
		};

		const createChildren = () =>
			Array.from({ length: countColumn }, () => ({
				id: uuidv4(),
				is_selected: false,
			}));

		const newTemplate = {
			id: uuidv4(),
			type: "container",
			version: versionTemplate.version,
			style: generateStyles(),
			components: createChildren(),
		};

		spaceTemplateDataAction([...spaceTemplateData, newTemplate]);

		if (cb) cb();
	};

	return {
		create,
	};
}
