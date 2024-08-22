import React, { useState } from "react";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import {
	AlignCenterVertical,
	AlignEndVertical,
	AlignStartVertical,
	AlignVerticalDistributeCenter,
	AlignVerticalJustifyCenter,
	AlignVerticalJustifyEnd,
	AlignVerticalJustifyStart,
	AlignVerticalSpaceAround,
	AlignVerticalSpaceBetween,
} from "lucide-react";

interface Props {
	onStyleChange?: (value: unknown) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

type JustifyContent =
	| "flex-start"
	| "flex-end"
	| "center"
	| "space-between"
	| "space-around"
	| "space-evenly";

type AlignItems = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

interface IStylesValues {
	justifyContent: JustifyContent;
	alignItems: AlignItems;
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
const LayoutStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
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
				return {
					...size,
					[key]: value,
				};
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeStylesHandle", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Список массива для вывода в для justify-content параметров
	 */
	const justifyContentOptions: Array<{
		value: JustifyContent;
		icon: React.ReactNode;
	}> = [
		{ value: "flex-start", icon: <AlignVerticalJustifyStart /> },
		{ value: "center", icon: <AlignVerticalJustifyCenter /> },
		{ value: "flex-end", icon: <AlignVerticalJustifyEnd /> },
		{ value: "space-between", icon: <AlignVerticalSpaceBetween /> },
		{ value: "space-around", icon: <AlignVerticalSpaceAround /> },
		{ value: "space-evenly", icon: <AlignVerticalDistributeCenter /> },
	];

	/**
	 * @author Zholaman Zhumanov
	 * @description Список массива для вывода в для align-items параметров
	 */
	const alignItemsOptions: Array<{
		value: AlignItems;
		icon: React.ReactNode;
	}> = [
		{ value: "flex-start", icon: <AlignStartVertical /> },
		{ value: "center", icon: <AlignCenterVertical /> },
		{ value: "flex-end", icon: <AlignEndVertical /> },
	];

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Position</h3>}

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Justify-Content
			</Label>
			<div className={cn("w-full grid grid-cols-6 mt-3 gap-2 mb-6")}>
				{justifyContentOptions.map((content) => {
					return (
						<button
							key={content.value}
							type="button"
							className={cn(
								"w-[30px] h-[30px] border flex items-center justify-center",
								stylesValues.justifyContent === content.value
									? "text-blue-500"
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
					);
				})}
			</div>

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Align-Items
			</Label>
			<div className={cn("w-full grid grid-cols-6 mt-3 gap-2")}>
				{alignItemsOptions.map((content) => {
					return (
						<button
							key={content.value}
							type="button"
							className={cn(
								"w-[30px] h-[30px] border flex items-center justify-center",
								stylesValues.alignItems === content.value
									? "text-blue-500"
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
					);
				})}
			</div>
		</div>
	);
};

export default LayoutStyles;
