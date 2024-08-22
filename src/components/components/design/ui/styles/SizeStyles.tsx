import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Label } from "@/components/shared/shadcn/ui/label";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface Props {
	onSizeChange?: (newSize: number) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

interface ISizeValues {
	width: number;
	height: number;
}

type SizeValues = "width" | "height";

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
	const { onSizeChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [sizeValues, setSizeValues] = useState<ISizeValues>({
		width: 0,
		height: 0,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeSizeHandle = (value: string, type: SizeValues) => {
		try {
			switch (type) {
				case "width":
					setSizeValues((size) => {
						return {
							...size,
							width: parseFloat(value),
						};
					});
					break;
				case "height":
					setSizeValues((size) => {
						return {
							...size,
							height: parseFloat(value),
						};
					});
					break;
				default:
					toastMessage("TypeError: type is not defined", "error");
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeSizeHandle", error);
			}
		}
	};

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Size</h3>}
			<div className={cn("w-full grid grid-cols-2 gap-4 p-1")}>
				<div>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Width
					</Label>
					<Input
						className={cn("mt-2")}
						value={sizeValues.width}
						type="number"
						placeholder="width"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "width");
						}}
					/>
				</div>
				<div>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Height
					</Label>
					<Input
						className={cn("mt-2")}
						value={sizeValues.height}
						type="number"
						placeholder="height"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "height");
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default SizeStyles;
