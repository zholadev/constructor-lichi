import React from "react";
import { v4 as uuidv4 } from "uuid";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryHorizontal } from "lucide-react";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

type BlockType = "block" | "swiper" | "initial";

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const TemplateAddDialog: React.FC = () => {
	const { dialogAddTemplateAction, spaceTemplateDataAction } =
		useDispatchAction();

	const toastMessage = useToastMessage();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const [blockType, setBlockType] = React.useState<BlockType>("initial");
	const [countColumn, setCountColumn] = React.useState<number>(1);

	const toggleDialogHandle = () => {
		dialogAddTemplateAction(!dialogAddTemplate);
		setBlockType("initial");
		setCountColumn(1);
	};

	const onSelectBlockType = (
		type: BlockType,
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
	const onConfirmHandle = () => {
		if (blockType === "initial") {
			toastMessage("Вы не выбрали тип блока!", "error");
			return;
		}

		const createTemplateColumns = () => {
			return Array(countColumn).fill("1fr").join(" ");
		};

		const styles = () => {
			if (blockType === "block") {
				return {
					display:
						countColumn > 1 && blockType === "block"
							? "grid"
							: "block",
					gap: "2px",
					gridTemplateColumns: createTemplateColumns(),
					marginBottom: "2px",
				};
			}
			return {
				display: "block",
				marginBottom: "2px",
			};
		};

		const createChildren = () => {
			return Array.from({ length: countColumn }, (_, index) => ({
				id: uuidv4(),
			}));
		};

		spaceTemplateDataAction([
			...spaceTemplateData,
			{
				id: uuidv4(),
				type: "container",
				version: "1.0.0",
				style: styles(),
				components: createChildren(),
			},
		]);

		toggleDialogHandle();
	};

	return (
		<Dialog open={dialogAddTemplate} onOpenChange={toggleDialogHandle}>
			<Button onClick={toggleDialogHandle}>Создать страницу</Button>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-md")}>
						Добавить блок
					</DialogTitle>
				</DialogHeader>
				<div className="w-full">
					<h3>Выберите тип блока</h3>
					<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
						<Button
							variant={
								blockType === "block" ? "default" : "outline"
							}
							className={cn(
								"p-3 border w-full h-[120px] flex flex-col"
							)}
							onClick={() => {
								onSelectBlockType("block", "container", "1");
							}}
						>
							<ImageIcon
								width={60}
								height={60}
								className={cn("mb-3")}
							/>{" "}
							Block
						</Button>
						<Button
							variant={
								blockType === "swiper" ? "default" : "outline"
							}
							className={cn(
								"p-3 border w-full h-[120px] flex flex-col"
							)}
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

					<div
						className={cn(
							"w-full flex flex-row gap-2 items-center"
						)}
					>
						<h3
							className={cn(
								"text-xs uppercase text-gray-600 mb-3"
							)}
						>
							количество колонок
						</h3>

						<Input
							type="number"
							disabled={
								blockType === "swiper" ||
								blockType === "initial"
							}
							maxLength={12}
							minLength={1}
							value={countColumn}
							className={cn("mb-4 max-w-[300px]")}
							onChange={(e) => {
								onSelectBlockType(
									blockType,
									"column",
									e.target.value
								);
							}}
						/>
					</div>
				</div>

				<DialogFooter>
					<Button variant="outline" onClick={toggleDialogHandle}>
						Отмена
					</Button>
					<Button onClick={onConfirmHandle} type="button">
						Подтвердить
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default TemplateAddDialog;
