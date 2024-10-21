import React, { useEffect, useState } from "react";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	PinBottomIcon,
	PinLeftIcon,
	PinRightIcon,
	PinTopIcon,
} from "@radix-ui/react-icons";
import usePermission from "@/components/shared/hooks/usePermission";
import { Button } from "@/components/shared/shadcn/ui/button";

type SpacingType = "margin" | "padding";
type Sides = "top" | "left" | "bottom" | "right";

interface IStylesValues {
	margin: Record<Sides, number>;
	padding: Record<Sides, number>;
}

interface Props {
	onUpdateSchemaHandle?: (values: {
		margin: number[];
		padding: number[];
	}) => void;
	styles?: { margin: number[]; padding: number[] } | null;
	hideTitle?: boolean;
	onRemoveSchemaHandle: (
		type: string,
		pathKey: string,
		pathMultiKeys: string[]
	) => void;
}

function convertToCssArray(styles: {
	margin: Record<Sides, number>;
	padding: Record<Sides, number>;
}): {
	margin: number[];
	padding: number[];
} {
	const { margin, padding } = styles;

	// Преобразуем объект margin в массив значений по порядку [top, right, bottom, left]
	const marginArray = [
		margin.top || 0,
		margin.right || 0,
		margin.bottom || 0,
		margin.left || 0,
	];

	// Преобразуем объект padding в массив значений по порядку [top, right, bottom, left]
	const paddingArray = [
		padding.top || 0,
		padding.right || 0,
		padding.bottom || 0,
		padding.left || 0,
	];

	return {
		margin: marginArray,
		padding: paddingArray,
	};
}

function convertToObject(styles: { margin: number[]; padding: number[] }) {
	// Если передан массив длиной 4 для margin, берем значения из него, иначе используем [0, 0, 0, 0]
	const [marginTop, marginRight, marginBottom, marginLeft] =
		styles?.margin?.length === 4 ? styles.margin : [0, 0, 0, 0];

	// Если передан массив длиной 4 для padding, берем значения из него, иначе используем [0, 0, 0, 0]
	const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
		styles?.padding?.length === 4 ? styles.padding : [0, 0, 0, 0];

	return {
		margin: {
			top: marginTop,
			right: marginRight,
			bottom: marginBottom,
			left: marginLeft,
		},
		padding: {
			top: paddingTop,
			right: paddingRight,
			bottom: paddingBottom,
			left: paddingLeft,
		},
	};
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const SpacingStyles: React.FC<Props> = (props) => {
	const { onRemoveSchemaHandle, styles, hideTitle, onUpdateSchemaHandle } =
		props;

	const permission = usePermission();
	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		margin: { top: 0, left: 0, bottom: 0, right: 0 },
		padding: { top: 0, left: 0, bottom: 0, right: 0 },
	});

	const iconMap = {
		top: PinTopIcon,
		bottom: PinBottomIcon,
		left: PinLeftIcon,
		right: PinRightIcon,
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение стилей
	 * @param value
	 * @param key
	 * @param side
	 */
	const onChangeHandle = (value: string, key: SpacingType, side: Sides) => {
		try {
			if (!value || !key) {
				toastMessage("ValueError: value | key is not defined", "error");
				return;
			}

			const newValue = parseFloat(value);

			setStylesValues((prev) => {
				const updateValues = {
					...prev,
					[key]: {
						...prev[key],
						[side]: newValue,
					},
				};

				if (onUpdateSchemaHandle) {
					const covertSpacing = convertToCssArray(updateValues);
					onUpdateSchemaHandle(covertSpacing);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeHandle", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления всех стилей которые относится к модулю Position
	 */
	const removeStylesHandle = () => {
		if (onRemoveSchemaHandle) {
			onRemoveSchemaHandle("removeKey", "", [
				"style.padding",
				"style.margin",
			]);
		}
	};

	const renderInputs = (type: SpacingType) => {
		return (["top", "bottom", "left", "right"] as Sides[]).map((side) => {
			const Icon = iconMap[side];
			return (
				<div
					key={side}
					className={cn(
						"w-full flex flex-row items-center gap-2 border rounded-md p-1"
					)}
				>
					<Icon width={30} />
					<Input
						className={cn(
							"border-0 text-right focus-visible:ring-0"
						)}
						value={stylesValues[type][side]}
						type="number"
						placeholder={`${side}`}
						onChange={(e) =>
							onChangeHandle(e.target.value, type, side)
						}
					/>
				</div>
			);
		});
	};

	useEffect(() => {
		if (styles?.margin || styles?.padding) {
			const reverseConvertObj = convertToObject(styles);
			setStylesValues(reverseConvertObj);
		} else {
			setStylesValues({
				margin: { top: 0, left: 0, bottom: 0, right: 0 },
				padding: { top: 0, left: 0, bottom: 0, right: 0 },
			});
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Spacing</h3>}

			{removeStylesHandle && (
				<div
					className={cn(
						"flex flex-row gap-2 items-center justify-end"
					)}
				>
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
			)}

			{permission.styles.spacing.margin && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Margin (Outside)
					</Label>
					<div
						className={cn(
							"w-full grid grid-cols-2 mt-2 gap-2 mb-6"
						)}
					>
						{renderInputs("margin")}
					</div>
				</>
			)}

			{permission.styles.spacing.padding && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Padding (Inside)
					</Label>
					<div className={cn("w-full grid grid-cols-2 mt-2 gap-2")}>
						{renderInputs("padding")}
					</div>
				</>
			)}
		</div>
	);
};

export default SpacingStyles;
