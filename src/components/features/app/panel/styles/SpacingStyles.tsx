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
	onStyleChange?: (values: { margin: string; padding: string }) => void;
	styles?: Record<string, unknown>;
	hideTitle?: boolean;
	onRemoveStylesChange: (type: string, valueKeys: string[]) => void;
}

function convertToCssString(styles: IStylesValues): {
	margin: string;
	padding: string;
} {
	const { margin, padding } = styles;

	const marginString = `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px`;
	const paddingString = `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`;

	return {
		margin: marginString,
		padding: paddingString,
	};
}

function convertToObject(styles: { margin: string; padding: string }) {
	const marginValues = styles?.margin ? styles.margin.split(" ") : [];
	const paddingValues = styles?.padding ? styles.padding.split(" ") : [];

	const [marginTop, marginRight, marginBottom, marginLeft] =
		marginValues.length === 4
			? marginValues.map((value) => parseInt(value.replace("px", ""), 10))
			: [0, 0, 0, 0];

	const [paddingTop, paddingRight, paddingBottom, paddingLeft] =
		paddingValues.length === 4
			? paddingValues.map((value) =>
					parseInt(value.replace("px", ""), 10)
				)
			: [0, 0, 0, 0];

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
	const { onStyleChange, styles, hideTitle, onRemoveStylesChange } = props;

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
	 * @param type
	 * @param side
	 */
	const onChangeStylesHandle = (
		value: string,
		type: SpacingType,
		side: Sides
	) => {
		try {
			if (!value) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			if (!type) {
				toastMessage("TypeError: type is not defined", "error");
				return;
			}

			const newValue = parseFloat(value);

			setStylesValues((prev) => {
				const updateValues = {
					...prev,
					[type]: {
						...prev[type],
						[side]: newValue,
					},
				};

				if (onStyleChange) {
					const covertSpacing = convertToCssString(updateValues);
					onStyleChange(covertSpacing);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeJustifyHandle", error);
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
							onChangeStylesHandle(e.target.value, type, side)
						}
					/>
				</div>
			);
		});
	};

	useEffect(() => {
		if ((styles && styles.margin) || styles?.padding) {
			const reverseConvertObj = convertToObject(styles);
			setStylesValues(reverseConvertObj);
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Spacing</h3>}

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
