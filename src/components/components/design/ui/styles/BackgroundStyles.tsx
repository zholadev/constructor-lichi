import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

interface Props {
	onSizeChange?: (newSize: number) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

interface IStylesValues {
	backgroundColor: string;
}

type StylesValues = "backgroundColor";

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
const BackgroundStyles: React.FC<Props> = (props) => {
	const { onSizeChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		backgroundColor: "#000000",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeSizeHandle = (value: string, type: StylesValues) => {
		try {
			switch (type) {
				case "backgroundColor":
					setStylesValues((size) => {
						return {
							...size,
							[type]: value,
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
			<div className={cn("w-full p-1")}>
				<div>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Background Color
					</Label>
					<div
						className={cn(
							"grid mt-2 grid-cols-3 gap-3 p-1 border rounded-md"
						)}
					>
						<Input
							className={cn("border-0 p-0")}
							value={stylesValues.backgroundColor}
							type="color"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"backgroundColor"
								);
							}}
						/>

						<Input
							className={cn(
								"col-span-2 border-0 focus-visible:ring-0"
							)}
							value={stylesValues.backgroundColor}
							type="text"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"backgroundColor"
								);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BackgroundStyles;
