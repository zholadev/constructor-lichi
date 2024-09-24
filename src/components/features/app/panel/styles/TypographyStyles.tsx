import React, { CSSProperties, useEffect, useMemo, useState } from "react";
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
import { ItalicIcon, UnderlineIcon } from "lucide-react";

type FontFamilyTypes =
	| "Futura PT"
	| "Bodoni Cyrillic"
	| "Helvetica Bold"
	| "AnastasiaScript"
	| "No Name"
	| "Dubai Light"
	| "Venski Sad One"
	| "AndatinoScript"
	| "Cormorant-Light"
	| "Cinzel"
	| "CormorantGaramond"
	| "Lace";

type FontStylesType = "italic" | "normal";
type FontUnits = "px" | "em" | "rem" | "%";
type TextAlign = "left" | "center" | "right" | "justify";
type TextDecoration = "underline" | "initial";
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
	| "bold"
	| "normal";

interface IStylesValues {
	fontFamily: FontFamilyTypes;
	fontSize: string;
	textAlign: TextAlign;
	unit: FontUnits;
	fontWeight: FontWeights;
	color: string;
	fontStyle: FontStylesType;
	textDecoration: TextDecoration;
}

type StylesValues = keyof IStylesValues;

interface IFontFamilyData {
	name: FontFamilyTypes;
	value: FontFamilyTypes;
	fontWeights: FontWeights[];
	fontStyles?: FontStylesType[];
}

interface IFontStyleData {
	name: FontStylesType;
	icon: React.ReactNode;
}

interface Props {
	onStyleChange?: (values: CSSProperties) => void;
	styles?: IStylesValues;
	hideTitle?: boolean;
}

const fontStyleData: IFontStyleData[] = [
	{
		name: "italic",
		icon: <ItalicIcon width={15} height={15} />,
	},
];

const fontFamilyData: IFontFamilyData[] = [
	{
		name: "Futura PT",
		value: "Futura PT",
		fontWeights: ["300", "400", "500", "900", "bold"],
		fontStyles: [],
	},
	{
		name: "Bodoni Cyrillic",
		value: "Bodoni Cyrillic",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "Helvetica Bold",
		value: "Helvetica Bold",
		fontWeights: ["700"],
		fontStyles: [],
	},
	{
		name: "AnastasiaScript",
		value: "AnastasiaScript",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "No Name",
		value: "No Name",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "Dubai Light",
		value: "Dubai Light",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "Venski Sad One",
		value: "Venski Sad One",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "AndatinoScript",
		value: "AndatinoScript",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "Cormorant-Light",
		value: "Cormorant-Light",
		fontWeights: [],
		fontStyles: [],
	},
	{
		name: "Cinzel",
		value: "Cinzel",
		fontWeights: ["400", "700"],
		fontStyles: [],
	},
	{
		name: "CormorantGaramond",
		value: "CormorantGaramond",
		fontWeights: ["400", "700"],
		fontStyles: ["italic"],
	},
	{
		name: "Lace",
		value: "Lace",
		fontWeights: [],
		fontStyles: [],
	},
];

const textAlignOptions: Array<{ value: TextAlign; icon: React.ReactNode }> = [
	{
		value: "left",
		icon: <TextAlignLeftIcon width={20} height={20} />,
	},
	{
		value: "center",
		icon: <TextAlignCenterIcon width={20} height={20} />,
	},
	{
		value: "right",
		icon: <TextAlignRightIcon width={20} height={20} />,
	},
	{
		value: "justify",
		icon: <TextAlignJustifyIcon width={20} height={20} />,
	},
];

const unitOptions: FontUnits[] = ["px", "em", "rem", "%"];

const extractStyles = (styles: IStylesValues): IStylesValues => {
	let defaultStyles: IStylesValues = {
		fontFamily: "Futura PT",
		fontSize: "14",
		textAlign: "left",
		unit: "px",
		fontWeight: "400",
		color: "#000000",
		fontStyle: "normal",
		textDecoration: "initial",
	};

	let { fontSize } = defaultStyles;

	// Проверяем, является ли fontSize строкой, и извлекаем значение и единицу измерения
	if (styles.fontSize && typeof styles.fontSize === "string") {
		const fontSizeMatch = styles.fontSize.match(/^(\d+)(px|em|rem|%)$/);
		if (fontSizeMatch) {
			fontSize = fontSizeMatch[1]?.toString();
		}
	}

	return {
		fontFamily:
			(styles.fontFamily as FontFamilyTypes) || defaultStyles.fontFamily,
		fontSize,
		textAlign: (styles.textAlign as TextAlign) || defaultStyles.textAlign,
		unit: styles.unit || defaultStyles.unit,
		fontWeight:
			(styles.fontWeight as FontWeights) || defaultStyles.fontWeight,
		color: styles.color || defaultStyles.color,
		fontStyle:
			(styles.fontStyle as FontStylesType) || defaultStyles.fontStyle,
		textDecoration:
			(styles.textDecoration as TextDecoration) ||
			defaultStyles.textDecoration,
	};
};

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Refactoring, types ref
 * @fixme
 * @param props
 * @constructor
 */
const TypographyStyles: React.FC<Props> = (props) => {
	const { onStyleChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		fontFamily: "Futura PT",
		fontSize: "14",
		textAlign: "left",
		unit: "px",
		fontWeight: "400",
		color: "#000000",
		fontStyle: "normal",
		textDecoration: "initial",
	});

	const removeStylesHandle = () => {
		if (onStyleChange) {
			onStyleChange(
				{},
				[
					"style.fontFamily",
					"style.fontSize",
					"style.textAlign",
					"style.unit",
					"style.fontWeight",
					"style.color",
					"style.fontStyle",
					"style.textDecoration",
				],
				"removeKey"
			);
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод возвращает активный FontWeight для шрифта
	 */
	const currentFontWeight: FontWeights[] = useMemo(() => {
		const findData = fontFamilyData.filter(
			(font) => font.name === stylesValues.fontFamily
		)?.[0];

		if (!findData) {
			return [];
		}

		return findData.fontWeights;
	}, [stylesValues, fontFamilyData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод возвращает активный FontStyles для шрифта
	 */
	const currentFontStyles: IFontStyleData[] = useMemo(() => {
		const findData = fontFamilyData.filter(
			(font) => font.name === stylesValues.fontFamily
		)?.[0];

		if (!findData) {
			return [];
		}

		return fontStyleData.filter((fontStyle) => {
			return findData.fontStyles?.includes(fontStyle.name);
		});
	}, [stylesValues, fontStyleData]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param key
	 * @param value
	 */
	const onChangeStyleHandle = (
		key: StylesValues,
		value:
			| FontFamilyTypes
			| FontStylesType
			| FontWeights
			| FontUnits
			| TextAlign
			| TextDecoration
			| number
			| string
	) => {
		try {
			if (!value || !key) {
				toastMessage(
					`Error: ${!value ? "key" : "value"} is not defined`,
					"error"
				);
				return;
			}

			setStylesValues((size) => {
				const updateValues = {
					...size,
					...(key !== "fontSize" && {
						fontSize: `${size.fontSize}${key === "unit" ? value : size.unit}`,
					}),
					[key]: key === "fontSize" ? `${value}${size.unit}` : value,
				};

				if (onStyleChange) {
					onStyleChange(updateValues);
				}

				return updateValues;
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("TypographyStyles", "onChangeSizeHandle", error);
			}
		}
	};

	useEffect(() => {
		if (styles) {
			const getStyles = extractStyles(styles);
			setStylesValues(getStyles);
		}
	}, [styles]);

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Typography</h3>}
			<div className={cn("w-full p-1")}>
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
							onClick={() => {
								removeStylesHandle();
							}}
						>
							Очистить
						</Button>
					</div>
				</div>
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
								onChangeStyleHandle("fontFamily", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Выберите шрифт" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{fontFamilyData.map((font, index) => {
										return (
											<SelectItem
												key={index}
												value={font.value}
											>
												{font.name}
											</SelectItem>
										);
									})}
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
								value={parseFloat(stylesValues.fontSize)}
								onChange={(e) => {
									onChangeStyleHandle(
										"fontSize",
										e.target.value
									);
								}}
							/>
						</div>

						<Select
							defaultValue={stylesValues.unit}
							value={stylesValues.unit}
							onValueChange={(value) =>
								onChangeStyleHandle("unit", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="px" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{unitOptions.map((unit) => {
										return (
											<SelectItem value={unit} key={unit}>
												{unit}
											</SelectItem>
										);
									})}
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
							disabled={currentFontWeight.length === 0}
							defaultValue={stylesValues.fontWeight}
							value={stylesValues.fontWeight}
							onValueChange={(value) =>
								onChangeStyleHandle("fontWeight", value)
							}
						>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="font weight" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{currentFontWeight.map((fontWeight) => {
										return (
											<SelectItem
												key={fontWeight}
												value={fontWeight}
											>
												{fontWeight}
											</SelectItem>
										);
									})}
								</SelectGroup>
							</SelectContent>
						</Select>

						<div className={cn("col-span-2")}>
							<div className={cn("grid grid-cols-4 gap-1")}>
								{currentFontStyles.map((fontStyle, index) => {
									return (
										<Button
											variant="outline"
											key={index}
											onClick={() =>
												onChangeStyleHandle(
													"fontStyle",
													stylesValues.fontStyle ===
														fontStyle.name
														? "normal"
														: fontStyle.name
												)
											}
											className={cn(
												"p-0",
												stylesValues.fontStyle ===
													fontStyle.name
													? "text-blue-400"
													: ""
											)}
										>
											{fontStyle.icon}
										</Button>
									);
								})}

								<Button
									variant="outline"
									onClick={() =>
										onChangeStyleHandle(
											"textDecoration",
											stylesValues.textDecoration ===
												"underline"
												? "initial"
												: "underline"
										)
									}
									className={cn(
										"p-0",
										stylesValues.textDecoration ===
											"underline"
											? "text-blue-400"
											: ""
									)}
								>
									<UnderlineIcon width={15} height={15} />
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
						{textAlignOptions.map((align) => {
							return (
								<Button
									key={align.value}
									variant="outline"
									onClick={() =>
										onChangeStyleHandle(
											"textAlign",
											align.value
										)
									}
									className={cn(
										"p-0",
										stylesValues.textAlign === align.value
											? "text-blue-400"
											: ""
									)}
								>
									{align.icon}
								</Button>
							);
						})}
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
							onInput={(e) => {
								onChangeStyleHandle("color", e.target.value);
							}}
						/>

						<Input
							className={cn(
								"col-span-2 border-0 focus-visible:ring-0"
							)}
							defaultValue={stylesValues.color}
							type="text"
							onChange={(e) => {
								onChangeStyleHandle("color", e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TypographyStyles;
