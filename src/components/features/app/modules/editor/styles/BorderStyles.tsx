import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Label } from "@/components/shared/shadcn/ui/label";
import { Input } from "@/components/shared/shadcn/ui/input";
import { Slider } from "@/components/shared/shadcn/ui/slider";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import {
	BorderAllIcon,
	BorderBottomIcon,
	BorderLeftIcon,
	BorderRightIcon,
	BorderTopIcon,
	CornerBottomLeftIcon,
	CornerBottomRightIcon,
	CornersIcon,
	CornerTopLeftIcon,
	CornerTopRightIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";
import usePermission from "@/components/shared/hooks/usePermission";

type BorderStyleType = "solid" | "dashed" | "dotted";

interface IStyleValues {
	borderWidth: number[];
	borderTopLeftRadius: number;
	borderBottomLeftRadius: number;
	borderTopRightRadius: number;
	borderBottomRightRadius: number;
	borderRadius: number[];
	borderColor: string;
	borderEnabled: boolean;
	borderStyle: BorderStyleType;
	border: boolean;
	borderLeft: boolean;
	borderRight: boolean;
	borderTop: boolean;
	borderBottom: boolean;
	borderDark: boolean;
	borderLeftDark: boolean;
	borderRightDark: boolean;
	borderTopDark: boolean;
	borderBottomDark: boolean;
}

type StyleKeys =
	| "borderWidth"
	| "borderTopLeftRadius"
	| "borderBottomLeftRadius"
	| "borderTopRightRadius"
	| "borderBottomRightRadius"
	| "borderRadius"
	| "borderColor"
	| "borderEnabled"
	| "borderStyle"
	| "border"
	| "borderLeft"
	| "borderRight"
	| "borderTop"
	| "borderBottom";

interface Props {
	onUpdateSchemaHandle?: (
		value: unknown,
		path?: string,
		type?: string
	) => void;
	styles?: Record<string, unknown> | null;
	hideTitle?: boolean;
	onRemoveSchemaHandle?: (
		type: string,
		pathKey: string,
		pathMultiKeys: string[]
	) => void;
}

const parseBorderStyle = (border: string) => {
	const parts = border.split(" ");
	return {
		borderWidth: parseFloat(parts[0]),
		borderStyle: parts[1] as BorderStyleType,
		borderColor: parts[2],
	};
};

const borderTypesList = [
	"style.border",
	"style.borderLeft",
	"style.borderRight",
	"style.borderTop",
	"style.borderBottom",
	"style.borderDark",
	"style.borderLeftDark",
	"style.borderRightDark",
	"style.borderTopDark",
	"style.borderBottomDark",
];

const computeInitialStyles = (styles?: React.CSSProperties): IStyleValues => {
	const defaultValues: IStyleValues = {
		borderWidth: [1],
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderRadius: [0],
		borderColor: "#000000",
		borderEnabled: false,
		borderStyle: "solid",
		border: true,
		borderLeft: false,
		borderRight: false,
		borderTop: false,
		borderBottom: false,
		borderDark: true,
		borderLeftDark: false,
		borderRightDark: false,
		borderTopDark: false,
		borderBottomDark: false,
	};

	const isBorderStyle =
		styles?.border ||
		styles?.borderLeft ||
		styles?.borderTop ||
		styles?.borderBottom ||
		styles?.borderRight;

	if (isBorderStyle) {
		const { borderWidth, borderStyle, borderColor } = parseBorderStyle(
			isBorderStyle.toString()
		);
		defaultValues.borderWidth = [borderWidth];
		defaultValues.borderStyle = borderStyle;
		defaultValues.borderColor = borderColor;
		defaultValues.borderEnabled = true;
	} else {
		defaultValues.borderEnabled = false;
	}

	if (styles?.border) {
		defaultValues.border = true;
		defaultValues.borderLeft = false;
		defaultValues.borderRight = false;
		defaultValues.borderTop = false;
		defaultValues.borderBottom = false;
	} else if (styles?.borderLeft) {
		defaultValues.border = false;
		defaultValues.borderLeft = true;
		defaultValues.borderRight = false;
		defaultValues.borderTop = false;
		defaultValues.borderBottom = false;
	} else if (styles?.borderRight) {
		defaultValues.border = false;
		defaultValues.borderLeft = false;
		defaultValues.borderRight = true;
		defaultValues.borderTop = false;
		defaultValues.borderBottom = false;
	} else if (styles?.borderTop) {
		defaultValues.border = false;
		defaultValues.borderLeft = false;
		defaultValues.borderRight = false;
		defaultValues.borderTop = true;
		defaultValues.borderBottom = false;
	} else if (styles?.borderBottom) {
		defaultValues.border = false;
		defaultValues.borderLeft = false;
		defaultValues.borderRight = false;
		defaultValues.borderTop = false;
		defaultValues.borderBottom = true;
	}

	if (styles?.borderRadius) {
		const borderRadius = parseFloat(styles.borderRadius.toString());
		defaultValues.borderRadius = [borderRadius];
	}

	if (styles?.borderTopLeftRadius) {
		defaultValues.borderTopLeftRadius = parseFloat(
			styles.borderTopLeftRadius.toString()
		);
	}

	if (styles?.borderBottomLeftRadius) {
		defaultValues.borderBottomLeftRadius = parseFloat(
			styles.borderBottomLeftRadius.toString()
		);
	}
	if (styles?.borderTopRightRadius) {
		defaultValues.borderTopRightRadius = parseFloat(
			styles.borderTopRightRadius.toString()
		);
	}
	if (styles?.borderBottomLeftRadius) {
		defaultValues.borderBottomLeftRadius = parseFloat(
			styles.borderBottomLeftRadius.toString()
		);
	}

	return defaultValues;
};

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Tooltip, refactoring, removed @ts-ignore
 * @fixme
 * @param props
 * @constructor
 */
const BorderStyles: React.FC<Props> = (props) => {
	const { onUpdateSchemaHandle, styles, hideTitle, onRemoveSchemaHandle } = props;

	const permission = usePermission();
	const toastMessage = useToastMessage();

	const [styleValues, setStyleValues] = useState<IStyleValues>({
		borderWidth: [1],
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderRadius: [0],
		borderColor: "#000000",
		borderEnabled: false,
		borderStyle: "solid",
		border: true,
		borderLeft: false,
		borderRight: false,
		borderTop: false,
		borderBottom: false,
		borderDark: true,
		borderLeftDark: false,
		borderRightDark: false,
		borderTopDark: false,
		borderBottomDark: false,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления всех стилей которые относится к модулю Position
	 */
	const removeStylesHandle = (patMultiString: string[]) => {
		if (onRemoveSchemaHandle) {
			onRemoveSchemaHandle("removeKey", "", patMultiString);
		}
	};

	function updateStyleWithBorder(
		style: Record<string, unknown>,
		borderStyle: Record<string, unknown>
	) {
		const borderKeys = [
			"border",
			"borderLeft",
			"borderTop",
			"borderRight",
			"borderBottom",
		];

		const updatedStyle = Object.keys(style).reduce((acc, key) => {
			if (!borderKeys.includes(key)) {
				// @ts-ignore
				acc[key] = style[key];
			}
			return acc;
		}, {});

		return { ...updatedStyle, ...borderStyle };
	}

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param key
	 * @param value
	 */
	const onChangeStyleHandle = (
		key: StyleKeys,
		value: number[] | number | string | boolean
	) => {
		try {
			if (!key) {
				toastMessage("TypeError: key is not defined", "error");
			}

			const updatedValues = { ...styleValues, [key]: value };

			if (key === "borderRadius") {
				updatedValues.borderTopLeftRadius = value as number;
				updatedValues.borderTopRightRadius = value as number;
				updatedValues.borderBottomLeftRadius = value as number;
				updatedValues.borderBottomRightRadius = value as number;
			}

			if (
				key === "borderBottomRightRadius" ||
				key === "borderTopLeftRadius" ||
				key === "borderTopRightRadius" ||
				key === "borderBottomLeftRadius"
			) {
				updatedValues.borderRadius = [0];
			}

			if (
				key === "border" ||
				key === "borderRight" ||
				key === "borderLeft" ||
				key === "borderTop" ||
				key === "borderBottom"
			) {
				updatedValues.border = key === "border";
				updatedValues.borderRight = key === "borderRight";
				updatedValues.borderLeft = key === "borderLeft";
				updatedValues.borderTop = key === "borderTop";
				updatedValues.borderBottom = key === "borderBottom";
			}

			setStyleValues(updatedValues);

			if (onUpdateSchemaHandle) {
				const getBorderType = () => {
					if (updatedValues.borderRight) return "borderRight";
					if (updatedValues.borderLeft) return "borderLeft";
					if (updatedValues.borderTop) return "borderTop";
					if (updatedValues.borderBottom) return "borderBottom";
					return "border";
				};

				const borderType = getBorderType();

				const getBorderOptions = `${updatedValues.borderWidth}px ${updatedValues.borderStyle} ${updatedValues.borderColor}`;

				const borderRadiusCorner = {
					...{
						...(updatedValues.borderTopLeftRadius &&
							!updatedValues.borderRadius[0] && {
								borderTopLeftRadius: `${updatedValues.borderTopLeftRadius}px`,
							}),
					},
					...{
						...(updatedValues.borderTopRightRadius &&
							!updatedValues.borderRadius[0] && {
								borderTopRightRadius: `${updatedValues.borderTopRightRadius}px`,
							}),
					},
					...{
						...(updatedValues.borderBottomLeftRadius &&
							!updatedValues.borderRadius[0] && {
								borderBottomLeftRadius: `${updatedValues.borderBottomLeftRadius}px`,
							}),
					},
					...{
						...(updatedValues.borderBottomRightRadius &&
							!updatedValues.borderRadius[0] && {
								borderBottomRightRadius: `${updatedValues.borderBottomRightRadius}px`,
							}),
					},
				};

				const buildBorderStyles = {
					...(borderType && { [borderType]: getBorderOptions }),
					...(updatedValues.borderRadius[0] && {
						borderRadius: `${updatedValues.borderRadius[0]}px`,
					}),
					...borderRadiusCorner,
				};

				const buildNewStyle = updateStyleWithBorder(
					// @ts-ignore
					styles,
					buildBorderStyles
				);

				onUpdateSchemaHandle(buildNewStyle);
			}
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeSizeHandle", error);
			}
		}
	};

	useEffect(() => {
		if (styles) {
			const defaultStyles = computeInitialStyles(styles);
			setStyleValues(defaultStyles);
		}
	}, [styles]);

	const cornerOptions: Array<{
		value: StyleKeys;
		icon: React.ReactNode;
		float: "left" | "right";
	}> = [
		{
			value: "borderTopLeftRadius",
			icon: <CornerTopLeftIcon width={30} height={30} />,
			float: "left",
		},
		{
			value: "borderTopRightRadius",
			icon: <CornerTopRightIcon width={30} height={30} />,
			float: "right",
		},
		{
			value: "borderBottomLeftRadius",
			icon: <CornerBottomLeftIcon width={30} height={30} />,
			float: "left",
		},
		{
			value: "borderBottomRightRadius",
			icon: <CornerBottomRightIcon width={30} height={30} />,
			float: "right",
		},
	];

	const borderOptions: Array<{ value: StyleKeys; icon: React.ReactNode }> = [
		{
			value: "border",
			icon: <BorderAllIcon width={20} height={20} />,
		},
		{
			value: "borderBottom",
			icon: <BorderBottomIcon width={20} height={20} />,
		},
		{
			value: "borderTop",
			icon: <BorderTopIcon width={20} height={20} />,
		},
		{
			value: "borderLeft",
			icon: <BorderLeftIcon width={20} height={20} />,
		},
		{
			value: "borderRight",
			icon: <BorderRightIcon width={20} height={20} />,
		},
	];

	const borderStyleOptions: Array<{
		value: StyleKeys;
		type: BorderStyleType;
	}> = [
		{
			value: "borderStyle",
			type: "solid",
		},
		{
			value: "borderStyle",
			type: "dashed",
		},
		{
			value: "borderStyle",
			type: "dotted",
		},
	];

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Border</h3>}
			<div className={cn("w-full grid grid-cols-1 gap-4 p-1")}>
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
							onClick={() => removeStylesHandle(borderTypesList)}
						>
							Очистить
						</Button>
					</div>
				</div>

				{permission.styles.border.border && (
					<div
						className={cn(
							"flex flex-row gap-2 items-center border rounded-md pl-2"
						)}
					>
						<Label
							className={cn("uppercase")}
							style={{ fontSize: "10px" }}
						>
							Width
						</Label>
						<Slider
							value={styleValues.borderWidth}
							max={20}
							step={1}
							onValueChange={(value) => {
								onChangeStyleHandle("borderWidth", value);
							}}
						/>
						<Input
							maxLength={20}
							minLength={1}
							type="number"
							className={cn(
								"w-[60px] border-0 focus-visible:ring-0"
							)}
							value={styleValues.borderWidth?.[0]}
							onChange={(e) => {
								onChangeStyleHandle(
									"borderWidth",
									e.target.value
								);
							}}
						/>
					</div>
				)}

				{permission.styles.border.radius && (
					<>
						<Label
							className={cn("uppercase")}
							style={{ fontSize: "10px" }}
						>
							Radius
						</Label>
						<div
							className={cn(
								"flex flex-row gap-2 items-center border rounded-md pl-2"
							)}
						>
							<CornersIcon width={30} height={30} />
							<Slider
								value={styleValues.borderRadius}
								max={20}
								step={1}
								onValueChange={(value) => {
									onChangeStyleHandle("borderRadius", value);
								}}
							/>
							<Input
								maxLength={20}
								minLength={1}
								type="number"
								className={cn(
									"w-[60px] border-0 focus-visible:ring-0"
								)}
								value={styleValues.borderRadius?.[0]}
								onChange={(e) => {
									const convertToValueNumber = parseFloat(
										e.target.value
									);
									onChangeStyleHandle("borderRadius", [
										convertToValueNumber,
									]);
								}}
							/>
						</div>
					</>
				)}

				{permission.styles.border.radius && (
					<div className={cn("grid grid-cols-2 gap-4")}>
						{cornerOptions.map((corner, index) => {
							return (
								<div
									key={index}
									className={cn(
										"flex flex-row items-center border rounded-md pl-1"
									)}
								>
									{corner.float === "left" && corner.icon}
									<Input
										className={cn(
											`border-0 text-${corner.float} focus-visible:ring-0`
										)}
										value={styleValues[
											corner.value
										].toString()}
										type="number"
										onChange={(e) => {
											const convertToValueNumber =
												parseFloat(e.target.value);
											onChangeStyleHandle(corner.value, [
												convertToValueNumber,
											]);
										}}
									/>
									{corner.float === "right" && corner.icon}
								</div>
							);
						})}
					</div>
				)}

				{permission.styles.border.border && (
					<>
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
								value={styleValues.borderColor}
								type="color"
								onChange={(e) => {
									onChangeStyleHandle(
										"borderColor",
										e.target.value
									);
								}}
							/>

							<Input
								className={cn(
									"col-span-2 border-0 focus-visible:ring-0"
								)}
								value={styleValues.borderColor}
								type="text"
								onChange={(e) => {
									onChangeStyleHandle(
										"borderColor",
										e.target.value
									);
								}}
							/>
						</div>
					</>
				)}

				{permission.styles.border.border && (
					<div
						className={cn(
							"w-full flex items-center gap-2 flex-row justify-between"
						)}
					>
						{borderOptions.map((border, index) => {
							return (
								<button
									key={index}
									type="button"
									className={cn(
										"border w-[30px] h-[30px] flex justify-center items-center",
										styleValues[border.value]
											? "text-blue-400"
											: ""
									)}
									onClick={() => {
										onChangeStyleHandle(
											border.value,
											!styleValues[border.value]
										);
									}}
								>
									{border.icon}
								</button>
							);
						})}
					</div>
				)}

				{permission.styles.border.border && (
					<div
						className={cn(
							"w-full flex items-center gap-5 flex-row"
						)}
					>
						{borderStyleOptions.map((border, index) => {
							return (
								<div
									key={index}
									className={cn(
										"w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
									)}
									onClick={() => {
										onChangeStyleHandle(
											"borderStyle",
											border.type
										);
									}}
								>
									<button
										type="button"
										className={cn(
											`border border-${border.type} cursor-pointer w-full h-[1px] border-black`,
											styleValues.borderStyle ===
												border.type
												? "border-blue-400"
												: ""
										)}
									/>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default BorderStyles;
