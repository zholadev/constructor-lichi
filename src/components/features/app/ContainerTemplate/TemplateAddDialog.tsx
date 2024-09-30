"use client";

import React from "react";
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
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";

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
	const { dialogAddTemplateAction } = useDispatchAction();

	const templateEvent = useTemplateEvent();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);
	const { editorAddComponentType } = useAppSelector((state) => state.editor);

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
	const onConfirmHandle = () =>
		templateEvent.create(blockType, countColumn, toggleDialogHandle);

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

					{/* {editorAddComponentType === "base" && ( */}
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
					{/* )} */}
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
