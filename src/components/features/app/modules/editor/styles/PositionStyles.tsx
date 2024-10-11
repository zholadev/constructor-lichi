import React, { useEffect, useState } from "react";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import usePermission from "@/components/shared/hooks/usePermission";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	AlignBottomIcon,
	AlignCenterVerticallyIcon,
	AlignLeftIcon,
	AlignTopIcon,
	SpaceBetweenVerticallyIcon,
	SpaceEvenlyVerticallyIcon,
	AlignRightIcon,
} from "@radix-ui/react-icons";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/shared/shadcn/ui/tooltip";

type Display = "flex";

export type JustifyContent =
	| "flex-start"
	| "flex-end"
	| "center"
	| "space-between"
	| "space-around"
	| "space-evenly";

export type AlignItems =
	| "stretch"
	| "flex-start"
	| "flex-end"
	| "center"
	| "baseline";

interface IStylesValues {
	display: Display;
	justifyContent: JustifyContent;
	alignItems: AlignItems;
}

interface Props {
	onStyleChange?: (values: IStylesValues) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
	onRemoveStylesChange: (type: string, valueKeys: string[]) => void;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo type, onStyleChange
 * @fixme
 * @param props
 * @constructor
 */
const PositionStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle, onRemoveStylesChange } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение стилей
	 * @param key
	 * @param value
	 */
	const onChangeStylesHandle = (
		key: keyof IStylesValues,
		value: JustifyContent | AlignItems
	) => {
		try {
			if (!value) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			setStylesValues((size) => {
				const updateValues = {
					...size,
					[key]: value,
				};

				if (onStyleChange) {
					onStyleChange(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeStylesHandle", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления всех стилей которые относится к модулю Position
	 */
	const removeStylesHandle = () => {
		if (onRemoveStylesChange) {
			onRemoveStylesChange("removeKey", [
				"style.display",
				"style.justifyContent",
				"style.alignItems",
			]);
		}
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
		if (styles) {
			setStylesValues({
				display: "flex",
				justifyContent:
					(styles.justifyContent as JustifyContent) || "flex-start",
				alignItems: (styles.alignItems as AlignItems) || "flex-start",
			});
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Position</h3>}

			<div className={cn("flex flex-row gap-2 items-center justify-end")}>
				<div className={cn("flex flex-row items-center gap-2")}>
					<Button
						type="button"
						variant="ghost"
						className={cn("text-xs")}
						onClick={removeStylesHandle}
					>
						Очистить
					</Button>
				</div>
			</div>

			{permission.styles.position.justifyContent && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Justify-Content
					</Label>
					<div
						className={cn(
							"w-full grid grid-cols-6 mt-3 gap-2 mb-6"
						)}
					>
						{justifyContentOptions.map((content) => {
							return (
								<TooltipProvider key={content.value}>
									<Tooltip>
										<TooltipTrigger asChild>
											<button
												type="button"
												className={cn(
													"w-[30px] h-[30px] border flex items-center justify-center",
													stylesValues.justifyContent ===
														content.value
														? "text-blue-400"
														: ""
												)}
												onClick={() => {
													onChangeStylesHandle(
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
				</>
			)}

			{permission.styles.position.alignItems && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Align-Items
					</Label>
					<div className={cn("w-full grid grid-cols-6 mt-3 gap-2")}>
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
													stylesValues.alignItems ===
														content.value
														? "text-blue-400"
														: ""
												)}
												onClick={() => {
													onChangeStylesHandle(
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
				</>
			)}
		</div>
	);
};

export default PositionStyles;
