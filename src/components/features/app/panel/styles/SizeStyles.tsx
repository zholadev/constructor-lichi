import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Label } from "@/components/shared/shadcn/ui/label";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import usePermission from "@/components/shared/hooks/usePermission";

interface IStyleValues {
	width: number;
	height: number;
}

type StyleKeys = keyof IStyleValues;

interface SizeInputProps {
	size: StyleKeys;
}

interface Props {
	onStyleChange?: (value: IStyleValues) => void;
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
const SizeStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle } = props;

	const permission = usePermission();

	const toastMessage = useToastMessage();

	const [sizeValues, setSizeValues] = useState<IStyleValues>({
		width: 0,
		height: 0,
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

	const SizeInput: React.FC<SizeInputProps> = ({ size }) => {
		return (
			<div
				className={cn("w-full grid grid-cols-3 items-center gap-4 p-1")}
			>
				<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
					{size}
				</Label>
				<Input
					className={cn("col-span-2")}
					value={sizeValues[size]}
					type="number"
					placeholder={size}
					onChange={(e) => {
						onChangeSizeHandle(e.target.value, size);
					}}
				/>
			</div>
		);
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Назначаем дефолтные настройки
	 */
	useEffect(() => {
		setSizeValues({
			width: styles?.width ? parseFloat(styles.width.toString()) : 0,
			height: styles?.height ? parseFloat(styles.height.toString()) : 0,
		});
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Size</h3>}

			{permission.styles.size.width && <SizeInput size="width" />}

			{permission.styles.size.height && <SizeInput size="height" />}
		</div>
	);
};

export default SizeStyles;
