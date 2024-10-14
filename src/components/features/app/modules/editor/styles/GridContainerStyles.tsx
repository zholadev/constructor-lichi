import React, { CSSProperties, useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";

interface IStyles {
	gap: number;
}

interface Props {
	onStyleChange?: (values: CSSProperties) => void;
	styles?: Record<string, string>;
	hideTitle?: boolean;
}

const extractNumberGap = (value: string): Record<string, number> => {
	const numberValue = parseFloat(value);
	return { gap: numberValue };
};

const addUnit = (
	value: number,
	unit: string = "px"
): Record<string, unknown> => {
	return { gap: `${value}${unit}` };
};

/**
 * @author Zholaman Zhumanov
 * @created 24.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Refactoring, remove ts-ignore
 * @fixme
 * @param props
 * @constructor
 */
const GridContainerStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [stylesValue, setStylesValues] = useState<IStyles>({
		gap: 0,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод обновления стилей
	 * @param value
	 * @param key
	 */
	const onChangeStylesHandle = (value: number, key: keyof IStyles) => {
		try {
			if (!value || !key) {
				toastMessage("ValueError: value is not defined", "error");
				return;
			}

			setStylesValues((prev) => {
				const updateValues = {
					...prev,
					[key]: value,
				};

				if (onStyleChange) {
					const convertStyle = addUnit(value);
					onStyleChange(convertStyle);
				}

				return updateValues;
			});
		} catch (error) {
			errorHandler("layoutStyles", "onChangeJustifyHandle", error);
		}
	};

	useEffect(() => {
		if (styles) {
			const reverseConvertObj = extractNumberGap(styles.gap);
			// @ts-ignore
			setStylesValues(reverseConvertObj);
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Grid</h3>}

			{permission.styles.grid.gap && (
				<>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Grid Gap (Расстояние между)
					</Label>
					<div
						className={cn(
							"w-full flex flex-row mt-2 items-center gap-2"
						)}
					>
						<Input
							className={cn("focus-visible:ring-0")}
							value={stylesValue.gap}
							type="number"
							onChange={(e) =>
								onChangeStylesHandle(
									parseFloat(e.target.value),
									"gap"
								)
							}
						/>
					</div>
				</>
			)}
		</div>
	);
};

export default GridContainerStyles;
