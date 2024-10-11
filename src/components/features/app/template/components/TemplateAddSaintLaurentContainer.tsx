import React, { useState } from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryHorizontal } from "lucide-react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	DisplayContainerType,
	IContainerType,
	ISaintLaurentComponentType,
} from "@/components/shared/types/types";
import useContainerActions from "@/components/shared/hooks/actions/useContainerActions";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { versionContainer } from "@/components/app/versions/types/interface-version-container";
import { versionComponents } from "@/components/app/versions/types/interface-version-components";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

interface ITemplateAddSaintLaurent {
	blockType: DisplayContainerType;
	componentType: ISaintLaurentComponentType;
	versionContainer: string;
	versionComponent: string;
}

const containerValueDefaultState: ITemplateAddSaintLaurent = {
	blockType: "block",
	componentType: "single",
	versionContainer:
		versionContainer.saint_laurent_container?.[0]?.version ?? "0.1",
	versionComponent: versionComponents.saint_laurent?.[0]?.version,
};

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

	const toastMessage = useToastMessage();
	const containerActions = useContainerActions();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const [containerValue, setContainerValue] =
		React.useState<ITemplateAddSaintLaurent>(containerValueDefaultState);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (
		key: keyof ITemplateAddSaintLaurent,
		value: IContainerType | ISaintLaurentComponentType | string
	) => {
		if (!key || !value) {
			toastMessage("ValueError: value or key is not defined", "error");
			return;
		}
		setContainerValue((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для сброса данных
	 */
	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
		setContainerValue(containerValueDefaultState);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () =>
		containerActions.createSaintLaurentContainerEvent(
			containerValue.blockType,
			containerValue.componentType,
			containerValue.versionContainer,
			containerValue.versionComponent,
			toggleDialogHandle
		);

	return (
		<div className="w-full">
			<h3 className={cn("text-sm")}>
				Выберите тип контейнера для Saint Laurent
			</h3>
			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={
						containerValue.blockType === "block"
							? "default"
							: "outline"
					}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("blockType", "block");
					}}
				>
					<ImageIcon width={60} height={60} className={cn("mb-3")} />{" "}
					Block
				</Button>
				<Button
					variant={
						containerValue.blockType === "swiper"
							? "default"
							: "outline"
					}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeHandle("blockType", "swiper");
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

			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3 className={cn("text-sm")}>Выберите версию контейнера</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={containerValue.versionContainer}
						value={containerValue.versionContainer}
						disabled={
							versionContainer.saint_laurent_container?.length ===
							0
						}
						onValueChange={(value) =>
							onChangeHandle("versionContainer", value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{versionContainer.saint_laurent_container?.map(
									(version) => {
										return (
											<SelectItem
												key={version.version}
												value={version.version}
											>
												{version.version}
											</SelectItem>
										);
									}
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className={cn("w-full")}>
				<h3 className={cn("text-sm")}>
					Выберите тип компонента для Saint Laurent
				</h3>
				<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
					<Button
						variant={
							containerValue.componentType === "single"
								? "default"
								: "outline"
						}
						className={cn(
							"p-3 border w-full h-[120px] flex flex-col"
						)}
						onClick={() => {
							onChangeHandle("componentType", "single");
						}}
					>
						<ImageIcon
							width={60}
							height={60}
							className={cn("mb-3")}
						/>{" "}
						Один
					</Button>
					<Button
						variant={
							containerValue.componentType === "duo"
								? "default"
								: "outline"
						}
						className={cn(
							"p-3 border w-full h-[120px] flex flex-col"
						)}
						onClick={() => {
							onChangeHandle("componentType", "duo");
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
			</div>

			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3 className={cn("text-sm")}>Выберите версию компонента</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={containerValue.versionComponent}
						value={containerValue.versionComponent}
						disabled={
							versionComponents.saint_laurent?.length === 0 ||
							!containerValue.componentType
						}
						onValueChange={(value) =>
							onChangeHandle("versionComponent", value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{versionComponents.saint_laurent?.map(
									(version) => {
										return (
											<SelectItem
												key={version.version}
												value={version.version}
											>
												{version.version}
											</SelectItem>
										);
									}
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
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
