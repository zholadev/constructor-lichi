import React, { useState } from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryHorizontal } from "lucide-react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	IContainerType,
	ISaintLaurentComponentType,
} from "@/components/shared/types/types";
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
const TemplateAddSaintLaurentContainer: React.FC = () => {
	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();

	const containerActions = useContainerActions();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const [blockType, setBlockType] = useState<IContainerType>("container");
	const [componentType, setComponentType] =
		useState<ISaintLaurentComponentType>("single");

	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
		setBlockType("container");
		setComponentType("single");
	};

	const onChangeHandle = (
		type: IContainerType | ISaintLaurentComponentType,
		key: "componentType" | "blockType"
	) => {
		if (key === "componentType") {
			setComponentType(type);
			return;
		}
		setBlockType(type);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () =>
		containerActions.createSaintLaurentContainerEvent(
			blockType,
			componentType,
			toggleDialogHandle
		);

	return (
		<div className="w-full">
			<h3 className={cn("")}>
				Выберите тип контейнера для Saint Laurent
			</h3>
			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={blockType === "container" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("container", "blockType");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Block
				</Button>
				<Button
					variant={blockType === "swiper" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("swiper", "blockType");
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

			<h3 className={cn("")}>
				Выберите тип компонента для вывода для Saint Laurent
			</h3>
			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={componentType === "single" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("single", "componentType");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Один
				</Button>
				<Button
					variant={componentType === "duo" ? "default" : "outline"}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("duo", "componentType");
					}}
				>
					<div
						className={cn(
							"w-full flex flex-row justify-center items-center mb-3"
						)}
					>
						<ImageIcon width={60} height={60} />
						<ImageIcon width={60} height={60} />
					</div>
					Два
				</Button>
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

export default TemplateAddSaintLaurentContainer;
