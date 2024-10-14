import React, { useEffect } from "react";
import {
	ISchemaSettingsElement,
	SchemaSettingElementPositionX,
	SchemaSettingElementPositionY,
} from "@/components/shared/types/interface-schema-settings";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	AlignItems,
	JustifyContent,
} from "@/components/features/app/modules/editor/styles/PositionStyles";
import {
	ArrowRightIcon,
	ArrowDownIcon,
	AlignTopIcon,
	AlignCenterVerticallyIcon,
	AlignBottomIcon,
	SpaceBetweenVerticallyIcon,
	SpaceEvenlyVerticallyIcon,
	AlignLeftIcon,
	AlignRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import { Label } from "@/components/shared/shadcn/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shared/shadcn/ui/tooltip";

interface Props {
	settingValue?: ISchemaSettingsElement;
	onSettingChange?: (value: ISchemaSettingsElement) => void;
}

interface ElementSettings {
	justifyContent: JustifyContent;
	alignItems: AlignItems;
	gap: number;
	flexDirection: "column" | "row";
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Рефакторинг
 * @fixme
 * @param props
 * @constructor
 */
const ElementSetting: React.FC<Props> = (props) => {
	const { onSettingChange, settingValue } = props;

	const toastMessage = useToastMessage();

	const [elementSettingValue, setElementSettingValue] =
		React.useState<ISchemaSettingsElement>({
			style: {
				justifyContent: "center",
				alignItems: "flex-end",
				gap: 0,
				flexDirection: "column",
			},
		});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onSettingUpdateHandle = (
		key: keyof ElementSettings,
		value:
			| JustifyContent
			| AlignItems
			| SchemaSettingElementPositionX
			| SchemaSettingElementPositionY
			| number
			| string
	) => {
		if (!key || !value) {
			toastMessage(
				`ValueError: ${!key ? "key" : "value"} is not defined`,
				"error"
			);
			return;
		}

		setElementSettingValue((prevState) => {
			let updatedValues = { ...prevState };

			updatedValues.style = {
				...updatedValues.style,
				[key]: value,
			};

			if (onSettingChange) onSettingChange(updatedValues);

			return updatedValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Список массива для вывода в для justify-content параметров
	 */
	const justifyContentOptions: Array<{
		value: JustifyContent;
		icon: React.ReactNode;
		description?: string;
	}> = [
		{
			value: "flex-start",
			icon: <AlignTopIcon />,
			description:
				"Выравнивает элементы по началу основной оси (слева в случае горизонтального направления).",
		},
		{
			value: "center",
			icon: <AlignCenterVerticallyIcon />,
			description: "Выравнивает элементы по центру основной оси.",
		},
		{
			value: "flex-end",
			icon: <AlignBottomIcon />,
			description:
				"Выравнивает элементы по концу основной оси (справа в случае горизонтального направления).",
		},
		{
			value: "space-between",
			icon: <SpaceBetweenVerticallyIcon />,
			description:
				"Элементы распределяются по всей длине контейнера, первый элемент прижат к началу, последний — к концу, а остальные — с равными промежутками.",
		},
		{
			value: "space-evenly",
			icon: <SpaceEvenlyVerticallyIcon />,
			description:
				"Элементы распределяются с равными промежутками как между элементами, так и перед первым и после последнего элемента.",
		},
	];

	/**
	 * @author Zholaman Zhumanov
	 * @description Список массива для вывода в для align-items параметров
	 */
	const alignItemsOptions: Array<{
		value: AlignItems;
		icon: React.ReactNode;
		description?: string;
	}> = [
		{
			value: "flex-start",
			icon: <AlignLeftIcon />,
			description:
				"Элементы выравниваются по началу поперечной оси (верхняя часть в случае вертикального направления).",
		},
		{
			value: "center",
			icon: <AlignCenterVerticallyIcon />,
			description: "Элементы выравниваются по центру поперечной оси.",
		},
		{
			value: "flex-end",
			icon: <AlignRightIcon />,
			description:
				"Элементы выравниваются по концу поперечной оси (нижняя часть в случае вертикального направления).",
		},
	];

	useEffect(() => {
		if (settingValue) {
			setElementSettingValue({
				...settingValue,
			});
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1")}>
			<div className={cn("w-full mb-5")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Позиционирование
				</h3>
			</div>

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Justify-Content
			</Label>
			<div className={cn("w-full grid grid-cols-6 mt-3 gap-2 mb-6")}>
				{justifyContentOptions.map((content) => {
					return (
						<TooltipProvider key={content.value}>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										type="button"
										className={cn(
											"w-[30px] h-[30px] border flex items-center justify-center",
											elementSettingValue.style
												.justifyContent ===
												content.value
												? "text-blue-400"
												: ""
										)}
										onClick={() => {
											onSettingUpdateHandle(
												"justifyContent",
												content.value
											);
										}}
									>
										{content.icon}
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{content.description}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					);
				})}
			</div>

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Align-Items
			</Label>
			<div className={cn("w-full grid grid-cols-6 mt-3 mb-5 gap-2")}>
				{alignItemsOptions.map((content) => {
					return (
						<TooltipProvider key={content.value}>
							<Tooltip>
								<TooltipTrigger asChild>
									<button
										key={content.value}
										type="button"
										className={cn(
											"w-[30px] h-[30px] border flex items-center justify-center",
											elementSettingValue.style
												.alignItems === content.value
												? "text-blue-400"
												: ""
										)}
										onClick={() => {
											onSettingUpdateHandle(
												"alignItems",
												content.value
											);
										}}
									>
										{content.icon}
									</button>
								</TooltipTrigger>
								<TooltipContent>
									<p>{content.description}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					);
				})}
			</div>

			<div className={cn("w-full mb-5")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Направление элементов
				</h3>

				<div className={cn("w-full flex flex-row gap-3")}>
					<Button
						type="button"
						variant={
							elementSettingValue.style.flexDirection === "column"
								? "default"
								: "outline"
						}
						className={cn(
							"flex items-center flex-row gap-1 text-xs rounded-md"
						)}
						onClick={() => {
							onSettingUpdateHandle("flexDirection", "column");
						}}
					>
						<ArrowDownIcon /> <span>column</span>
					</Button>
					<Button
						type="button"
						variant={
							elementSettingValue.style.flexDirection === "row"
								? "default"
								: "outline"
						}
						className={cn(
							"flex items-center flex-row gap-1 text-xs rounded-md"
						)}
						onClick={() => {
							onSettingUpdateHandle("flexDirection", "row");
						}}
					>
						<ArrowRightIcon /> <span>row</span>
					</Button>
				</div>
			</div>

			<div className={cn("w-full")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Расстояние между элементами
				</h3>

				<Input
					type="number"
					value={elementSettingValue.style.gap}
					defaultValue={elementSettingValue.style.gap}
					onChange={(e) =>
						onSettingUpdateHandle("gap", parseFloat(e.target.value))
					}
				/>
			</div>
		</div>
	);
};

export default ElementSetting;
