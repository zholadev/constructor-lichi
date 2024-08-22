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

type SpacingType = "margin" | "padding";
type Sides = "top" | "left" | "bottom" | "right";

interface IStylesValues {
	margin: Record<Sides, number>;
	padding: Record<Sides, number>;
}

interface Props {
	onStyleChange?: (values: IStylesValues) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpacingStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle } = props;

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
					onStyleChange(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("layoutStyles", "onChangeJustifyHandle", error);
			}
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
		if (styles) {
			setStylesValues({
				margin: {
					top: parseFloat(styles.marginTop?.toString() || "0"),
					bottom: parseFloat(styles.marginBottom?.toString() || "0"),
					left: parseFloat(styles.marginLeft?.toString() || "0"),
					right: parseFloat(styles.marginRight?.toString() || "0"),
				},
				padding: {
					top: parseFloat(styles.paddingTop?.toString() || "0"),
					bottom: parseFloat(styles.paddingBottom?.toString() || "0"),
					left: parseFloat(styles.paddingLeft?.toString() || "0"),
					right: parseFloat(styles.paddingRight?.toString() || "0"),
				},
			});
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Spacing</h3>}

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Margin (Outside)
			</Label>
			<div className={cn("w-full grid grid-cols-2 mt-2 gap-2 mb-6")}>
				{renderInputs("margin")}
			</div>

			<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
				Padding (Inside)
			</Label>
			<div className={cn("w-full grid grid-cols-2 mt-2 gap-2")}>
				{renderInputs("padding")}
			</div>
		</div>
	);
};

export default SpacingStyles;
