import React, { CSSProperties, useMemo, useState } from "react";
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
	fontSize: number;
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
	styles?: React.CSSProperties;
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
	const { onStyleChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [stylesValues, setStylesValues] = useState<IStylesValues>({
		fontFamily: "Futura PT",
		fontSize: 14,
		textAlign: "left",
		unit: "px",
		fontWeight: "400",
		color: "#000000",
		fontStyle: "normal",
		textDecoration: "initial",
	});

	const currentFontWeight: FontWeights[] = useMemo(() => {
		const findData = fontFamilyData.filter(
			(font) => font.name === stylesValues.fontFamily
		)?.[0];

		if (!findData) {
			return [];
		}

		return findData.fontWeights;
	}, [stylesValues, fontFamilyData]);

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
					[key]: value,
				};

				if (onStyleChange) {
					onStyleChange(updateValues);
				}

				return updateValues;
			});
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
								defaultValue={stylesValues.fontSize}
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
							onChange={(e) => {
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
