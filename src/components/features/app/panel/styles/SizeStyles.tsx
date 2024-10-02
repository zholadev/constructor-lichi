import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Label } from "@/components/shared/shadcn/ui/label";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";
import { Button } from "@/components/shared/shadcn/ui/button";

interface IStyleValues {
	width: number;
	height: number;
	widthFull: boolean;
}

type StyleKeys = keyof IStyleValues;

interface Props {
	onStyleChange?: (value: IStyleValues) => void;
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
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SizeStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle, onRemoveStylesChange } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [sizeValues, setSizeValues] = useState<IStyleValues>({
		width: 0,
		height: 0,
		widthFull: false,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeSizeHandle = (value: string, type: StyleKeys) => {
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

			setSizeValues((size) => {
				const newUpdateValues = {
					...size,
					[type]: newValue,
				};

				if (onStyleChange) {
					onStyleChange(newUpdateValues);
				}

				return newUpdateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeSizeHandle", error);
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
				"style.height",
				"style.width",
				"styles.widthFull",
			]);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Назначаем дефолтные настройки
	 */
	useEffect(() => {
		if (styles) {
			setSizeValues({
				width: styles?.width ? parseFloat(styles.width.toString()) : 0,
				height: styles?.height
					? parseFloat(styles.height.toString())
					: 0,
				widthFull: !styles?.width,
			});
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Size</h3>}

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

			{permission.styles.size.width && (
				<div
					className={cn(
						"w-full grid grid-cols-3 items-center gap-4 p-1"
					)}
				>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Width
					</Label>
					<Input
						className={cn("col-span-2")}
						value={sizeValues.width}
						type="number"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "width");
						}}
					/>
				</div>
			)}

			{permission.styles.size.height && (
				<div
					className={cn(
						"w-full grid grid-cols-3 items-center gap-4 p-1"
					)}
				>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Height
					</Label>
					<Input
						className={cn("col-span-2")}
						value={sizeValues.height}
						type="number"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "height");
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default SizeStyles;
