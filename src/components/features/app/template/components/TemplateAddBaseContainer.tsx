import React from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryHorizontal } from "lucide-react";
import { Input } from "@/components/shared/shadcn/ui/input";
import { IContainerType } from "@/components/shared/types/types";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useContainerActions from "@/components/shared/hooks/actions/useContainerActions";

/**
 * @author Zholaman Zhumanov
 * @created 02.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const TemplateAddBaseContainer: React.FC = () => {
	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();

	const containerActions = useContainerActions();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const [blockType, setBlockType] = React.useState<IContainerType>("initial");
	const [countColumn, setCountColumn] = React.useState<number>(1);

	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
		setBlockType("initial");
		setCountColumn(1);
	};

	const onSelectBlockType = (
		type: IContainerType,
		key: "container" | "column",
		column: string
	) => {
		if (key === "column") {
			setCountColumn(parseFloat(column));
			return;
		}
		setBlockType(type);
		setCountColumn(parseFloat(column));
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () =>
		containerActions.createBaseContainer(
			blockType,
			countColumn,
			toggleDialogHandle
		);

	return (
		<div className="w-full">
			<h3>Выберите тип контейнера</h3>
			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={blockType === "container" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onSelectBlockType("container", "container", "1");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Block
				</Button>
				<Button
					variant={blockType === "swiper" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onSelectBlockType("swiper", "container", "1");
					}}
				>
					<GalleryHorizontal
						width={60}
						height={60}
						className={cn("mb-3")}
					/>
					Swiper
				</Button>
			</div>

			<div className={cn("w-full flex flex-row gap-2 items-center")}>
				<h3 className={cn("text-xs uppercase text-gray-600 mb-3")}>
					количество компонентов
				</h3>

				<Input
					type="number"
					maxLength={12}
					minLength={1}
					value={countColumn}
					className={cn("mb-4 max-w-[300px]")}
					onChange={(e) => {
						onSelectBlockType(blockType, "column", e.target.value);
					}}
				/>
			</div>

			<div className={cn("mt-5 flex items-center justify-end gap-2")}>
				<Button variant="outline" onClick={toggleDialogHandle}>
					Отмена
				</Button>
				<Button onClick={onConfirmHandle} type="button">
					Подтвердить
				</Button>
			</div>
		</div>
	);
};

export default TemplateAddBaseContainer;
