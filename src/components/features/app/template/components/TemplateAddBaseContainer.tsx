import React, { useMemo } from "react";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import { ImageIcon } from "@radix-ui/react-icons";
import { GalleryHorizontal } from "lucide-react";
import { Input } from "@/components/shared/shadcn/ui/input";
import { IContainerType } from "@/components/shared/types/types";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useContainerActions from "@/components/shared/hooks/actions/useContainerActions";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { versionContainer } from "@/components/app/versions/types/interface-version-container";

interface TemplateAddBaseContainer {
	blockType: IContainerType;
	countComponent: number;
	version: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 02.10.2024
 * @description Компонент для создания базового контейнера
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const TemplateAddBaseContainer: React.FC = () => {
	const toastMessage = useToastMessage();

	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();

	const containerActions = useContainerActions();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);

	const [containerValue, setContainerValue] =
		React.useState<TemplateAddBaseContainer>({
			blockType: "initial",
			countComponent: 1,
			version: versionContainer.container?.[0]?.version,
		});

	const versionTypeData = useMemo(() => {
		return containerValue.blockType === "swiper"
			? (versionContainer.swiper ?? [])
			: (versionContainer.container ?? []);
	}, [containerValue.blockType, versionContainer]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных для контейнера
	 * @param key
	 * @param value
	 */
	const onChangeContainerValue = (
		key: keyof TemplateAddBaseContainer,
		value: IContainerType | number | string
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
	 * @description Метод для закрытия диалога и вернуть дефолтные состояние
	 */
	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
		onChangeContainerValue("blockType", "initial");
		onChangeContainerValue("countComponent", 1);
		onChangeContainerValue(
			"version",
			versionContainer.container?.[0]?.version
		);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Функция который подтверждает добавление шаблона в доску
	 */
	const onConfirmHandle = () =>
		containerActions.createBaseContainer(
			containerValue.blockType,
			containerValue.countComponent,
			containerValue.version,
			toggleDialogHandle
		);

	return (
		<div className="w-full">
			<h3 className={cn("text-sm")}>Выберите тип контейнера</h3>
			<div className="grid grid-cols-2 gap-3 mb-7 mt-4">
				<Button
					variant={
						containerValue.blockType === "container"
							? "default"
							: "outline"
					}
					className={cn("p-3 border w-full h-[120px] flex flex-col")}
					onClick={() => {
						onChangeContainerValue("blockType", "container");
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
						onChangeContainerValue("blockType", "swiper");
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
						defaultValue={containerValue.version}
						value={containerValue.version}
						disabled={versionTypeData?.length === 0}
						onValueChange={(value) =>
							onChangeContainerValue("version", value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{versionTypeData.map((version) => {
									return (
										<SelectItem
											key={version.version}
											value={version.version}
										>
											{version.version}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div className={cn("w-full flex flex-row gap-2 items-center")}>
				<h3 className={cn("text-xs uppercase text-gray-600 mb-3")}>
					количество компонентов
				</h3>

				<Input
					type="number"
					maxLength={12}
					minLength={1}
					value={containerValue.countComponent}
					className={cn("mb-4 max-w-[300px]")}
					onChange={(e) => {
						onChangeContainerValue(
							"countComponent",
							parseFloat(e.target.value)
						);
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
