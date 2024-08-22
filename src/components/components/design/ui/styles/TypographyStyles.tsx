import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	TextAlignCenterIcon,
	TextAlignJustifyIcon,
	TextAlignLeftIcon,
	TextAlignRightIcon,
} from "@radix-ui/react-icons";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

interface Props {
	onSizeChange?: (newSize: number) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

type FontUnits = "px" | "em" | "rem" | "%";
type TextAlign = "left" | "center" | "right" | "justify";
type FontWeights =
	| "100"
	| "200"
	| "300"
	| "400"
	| "500"
	| "600"
	| "700"
	| "800"
	| "900"
	| "bold";

interface IStylesValues {
	fontFamily: string;
	fontSize: number;
	textAlign: TextAlign;
	unit: FontUnits;
	fontWeight: FontWeights;
	color: string;
}

type StylesValues =
	| "fontFamily"
	| "fontSize"
	| "textAlign"
	| "unit"
	| "fontWeight"
	| "color";

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
const TypographyStyles: React.FC<Props> = (props) => {
	const { onSizeChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		fontFamily: "Futura PT",
		fontSize: 14,
		textAlign: "left",
		unit: "px",
		fontWeight: "400",
		color: "#000000",
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
				case "fontFamily":
					setStylesValues((size) => {
						return {
							...size,
							[type]: value,
						};
					});
					break;
				case "fontSize":
					setStylesValues((size) => {
						return {
							...size,
							[type]: parseFloat(value),
						};
					});
					break;
				case "color":
					setStylesValues((size) => {
						return {
							...size,
							[type]: parseFloat(value),
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для unit размеров
	 * @param value
	 * @param type
	 */
	const onChangeUnitHandle = (value: FontUnits, type: StylesValues) => {
		try {
			switch (type) {
				case "unit":
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для unit размеров
	 * @param value
	 * @param type
	 */
	const onChangeAlignHandle = (value: TextAlign, type: StylesValues) => {
		try {
			switch (type) {
				case "textAlign":
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

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для unit размеров
	 * @param value
	 * @param type
	 */
	const onChangeFontWeightHandle = (
		value: FontWeights,
		type: StylesValues
	) => {
		try {
			switch (type) {
				case "fontWeight":
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
			{!hideTitle && <h3>Typography</h3>}
			<div className={cn("w-full p-1")}>
				<div>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Font Family
					</Label>
					<div className={cn("mt-2 mb-4")}>
						<Select
							defaultValue={stylesValues.fontFamily}
							value={stylesValues.fontFamily}
							onValueChange={(value) =>
								onChangeSizeHandle(value, "fontFamily")
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Выбериту шрифт" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Fruits</SelectLabel>
									<SelectItem value="apple">Apple</SelectItem>
									<SelectItem value="banana">
										Banana
									</SelectItem>
									<SelectItem value="blueberry">
										Blueberry
									</SelectItem>
									<SelectItem value="grapes">
										Grapes
									</SelectItem>
									<SelectItem value="pineapple">
										Pineapple
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className={cn("w-full mb-4")}>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Font Size
					</Label>

					<div className={cn("grid grid-cols-2 gap-2 mt-2")}>
						<div className={cn("")}>
							<Input
								type="number"
								className={cn("w-full")}
								defaultValue={stylesValues.fontSize}
								onChange={(e) => {
									onChangeSizeHandle(
										e.target.value,
										"fontSize"
									);
								}}
							/>
						</div>

						<Select
							defaultValue={stylesValues.unit}
							value={stylesValues.unit}
							onValueChange={(value: FontUnits) =>
								onChangeUnitHandle(value, "unit")
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="px" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="px">px</SelectItem>
									<SelectItem value="em">em</SelectItem>
									<SelectItem value="rem">rem</SelectItem>
									<SelectItem value="%">%</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<div className={cn("w-full mb-4")}>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Font Style
					</Label>

					<div className={cn("grid grid-cols-3 gap-2 mt-2")}>
						<Select
							defaultValue={stylesValues.fontWeight}
							value={stylesValues.fontWeight}
							onValueChange={(value: FontWeights) =>
								onChangeFontWeightHandle(value, "fontWeight")
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="font weight" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="100">100</SelectItem>
									<SelectItem value="200">200</SelectItem>
									<SelectItem value="300">300</SelectItem>
									<SelectItem value="400">400</SelectItem>
									<SelectItem value="500">500</SelectItem>
									<SelectItem value="600">600</SelectItem>
									<SelectItem value="700">700</SelectItem>
									<SelectItem value="800">800</SelectItem>
									<SelectItem value="900">900</SelectItem>
									<SelectItem value="bold">bold</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>

						<div className={cn("col-span-2")}>
							<div className={cn("grid grid-cols-3 gap-2")}>
								<Button
									variant="outline"
									onClick={() =>
										onChangeAlignHandle("left", "textAlign")
									}
								>
									<BoldIcon />
								</Button>

								<Button
									variant="outline"
									onClick={() =>
										onChangeAlignHandle(
											"center",
											"textAlign"
										)
									}
								>
									<ItalicIcon />
								</Button>
								<Button
									variant="outline"
									onClick={() =>
										onChangeAlignHandle(
											"right",
											"textAlign"
										)
									}
								>
									<UnderlineIcon />
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className={cn("w-full mb-4")}>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Text Align
					</Label>
					<div className={cn("grid grid-cols-4 gap-2 mt-2")}>
						<Button
							variant="outline"
							onClick={() =>
								onChangeAlignHandle("left", "textAlign")
							}
						>
							<TextAlignLeftIcon />
						</Button>

						<Button
							variant="outline"
							onClick={() =>
								onChangeAlignHandle("center", "textAlign")
							}
						>
							<TextAlignCenterIcon />
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								onChangeAlignHandle("right", "textAlign")
							}
						>
							<TextAlignRightIcon />
						</Button>
						<Button
							variant="outline"
							onClick={() =>
								onChangeAlignHandle("justify", "textAlign")
							}
						>
							<TextAlignJustifyIcon />
						</Button>
					</div>
				</div>
				<div className={cn("w-full")}>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Color
					</Label>

					<div
						className={cn(
							"grid mt-2 grid-cols-3 gap-3 p-1 border rounded-md"
						)}
					>
						<Input
							className={cn("border-0 p-0")}
							defaultValue={stylesValues.color}
							type="color"
							onChange={(e) => {
								onChangeSizeHandle(e.target.value, "color");
							}}
						/>

						<Input
							className={cn(
								"col-span-2 border-0 focus-visible:ring-0"
							)}
							defaultValue={stylesValues.color}
							type="text"
							onChange={(e) => {
								onChangeSizeHandle(e.target.value, "color");
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TypographyStyles;
