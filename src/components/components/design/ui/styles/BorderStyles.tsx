import React, { useState } from "react";
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
	BorderNoneIcon,
	BorderRightIcon,
	BorderTopIcon,
	CornerBottomLeftIcon,
	CornerBottomRightIcon,
	CornersIcon,
	CornerTopLeftIcon,
	CornerTopRightIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/shared/shadcn/ui/checkbox";

interface Props {
	onSizeChange?: (newSize: number) => void;
	styles?: React.CSSProperties;
	hideTitle?: boolean;
}

interface ISizeValues {
	borderWith: number[];
	borderTopLeftRadius: number;
	borderBottomLeftRadius: number;
	borderTopRightRadius: number;
	borderBottomRightRadius: number;
	borderRadius: number[];
	borderColor: string;
	borderEnabled: boolean;
}

type SizeValues =
	| "borderWith"
	| "borderTopLeftRadius"
	| "borderBottomLeftRadius"
	| "borderTopRightRadius"
	| "borderBottomRightRadius"
	| "borderRadius"
	| "borderColor"
	| "borderEnabled";

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Tooltip, type self, refactoring
 * @fixme
 * @param props
 * @constructor
 */
const BorderStyles: React.FC<Props> = (props) => {
	const { onSizeChange, styles, hideTitle } = props;

	const toastMessage = useToastMessage();

	const [sizeValues, setSizeValues] = useState<ISizeValues>({
		borderWith: [1],
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
		borderRadius: [0],
		borderColor: "#000000",
		borderEnabled: false,
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeSizeHandle = (value: number[] | string, type: SizeValues) => {
		try {
			if (!type) {
				toastMessage("TypeError: type is not defined", "error");
			}

			if (type === "borderRadius") {
				setSizeValues((size) => {
					return {
						...size,
						borderRadius: value,
						borderBottomLeftRadius: value,
						borderBottomRightRadius: value,
						borderTopLeftRadius: value,
						borderTopRightRadius: value,
					};
				});
				return;
			}

			setSizeValues((size) => {
				return {
					...size,
					[type]: value,
				};
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeSizeHandle", error);
			}
		}
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления значение для размеров
	 * @param value
	 * @param type
	 */
	const onChangeBorderToggleHandle = (value: boolean, type: SizeValues) => {
		try {
			if (!type) {
				toastMessage("TypeError: type is not defined", "error");
			}

			setSizeValues((size) => {
				return {
					...size,
					[type]: value,
				};
			});
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("sizeStyles", "onChangeSizeHandle", error);
			}
		}
	};

	return (
		<div className={cn("w-full flex flex-col")}>
			{!hideTitle && <h3>Border</h3>}
			<div className={cn("w-full grid grid-cols-1 gap-4 p-1")}>
				<div
					className={cn(
						"flex flex-row gap-2 items-center justify-between"
					)}
				>
					<Label
						className={cn("uppercase")}
						style={{ fontSize: "10px" }}
					>
						Enabled
					</Label>

					<div className={cn("flex flex-row items-center gap-2")}>
						<span>{sizeValues.borderEnabled ? "ON" : "OFF"}</span>
						<Checkbox
							defaultChecked={sizeValues.borderEnabled}
							onCheckedChange={(value: boolean) => {
								onChangeBorderToggleHandle(
									value,
									"borderEnabled"
								);
							}}
						/>
					</div>
				</div>
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
						defaultValue={sizeValues.borderWith}
						max={20}
						step={1}
						onValueChange={(value) => {
							onChangeSizeHandle(value, "borderWith");
						}}
					/>
					<Input
						maxLength={20}
						minLength={1}
						type="number"
						className={cn("w-[60px] border-0 focus-visible:ring-0")}
						value={sizeValues.borderWith?.[0]}
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "borderWith");
						}}
					/>
				</div>

				<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
					Radius
				</Label>
				<div
					className={cn(
						"flex flex-row gap-2 items-center border rounded-md pl-2"
					)}
				>
					<CornersIcon width={30} height={30} />
					<Slider
						defaultValue={sizeValues.borderRadius}
						max={20}
						step={1}
						onValueChange={(value) => {
							onChangeSizeHandle(value, "borderRadius");
						}}
					/>
					<Input
						maxLength={20}
						minLength={1}
						className={cn("w-[60px] border-0 focus-visible:ring-0")}
						value={sizeValues.borderRadius?.[0]}
					/>
				</div>
				<div className={cn("grid grid-cols-2 gap-4")}>
					<div
						className={cn(
							"flex flex-row items-center border rounded-md pl-1"
						)}
					>
						<CornerTopLeftIcon width={30} height={30} />
						<Input
							className={cn(
								"border-0 text-right focus-visible:ring-0"
							)}
							value={sizeValues.borderTopLeftRadius}
							type="number"
							placeholder="height"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"borderTopLeftRadius"
								);
							}}
						/>
					</div>
					<div
						className={cn(
							"flex flex-row items-center border rounded-md pr-1"
						)}
					>
						<Input
							className={cn("border-0 focus-visible:ring-0")}
							value={sizeValues.borderTopRightRadius}
							type="number"
							placeholder="height"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"borderTopRightRadius"
								);
							}}
						/>
						<CornerTopRightIcon width={30} height={30} />
					</div>
					<div
						className={cn(
							"flex flex-row items-center border rounded-md pl-1"
						)}
					>
						<CornerBottomLeftIcon width={30} height={30} />
						<Input
							className={cn(
								"border-0 text-right focus-visible:ring-0"
							)}
							value={sizeValues.borderBottomLeftRadius}
							type="number"
							placeholder="height"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"borderBottomLeftRadius"
								);
							}}
						/>
					</div>
					<div
						className={cn(
							"flex flex-row items-center border rounded-md pr-1"
						)}
					>
						<Input
							className={cn("border-0 focus-visible:ring-0")}
							value={sizeValues.borderBottomRightRadius}
							type="number"
							placeholder="height"
							onChange={(e) => {
								onChangeSizeHandle(
									e.target.value,
									"borderBottomRightRadius"
								);
							}}
						/>
						<CornerBottomRightIcon width={30} height={30} />
					</div>
				</div>

				<Label className={cn("uppercase")} style={{ fontSize: "10px" }}>
					Color
				</Label>
				<div
					className={cn(
						"grid mt-2 grid-cols-3 gap-3 p-1 border rounded-md"
					)}
				>
					<Input
						className={cn("border-0 p-0")}
						defaultValue={sizeValues.borderColor}
						type="color"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "borderColor");
						}}
					/>

					<Input
						className={cn(
							"col-span-2 border-0 focus-visible:ring-0"
						)}
						defaultValue={sizeValues.borderColor}
						type="text"
						onChange={(e) => {
							onChangeSizeHandle(e.target.value, "borderColor");
						}}
					/>
				</div>

				<div
					className={cn(
						"w-full flex items-center gap-2 flex-row justify-between"
					)}
				>
					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderAllIcon width={20} height={20} />
					</button>

					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderBottomIcon width={20} height={20} />
					</button>

					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderTopIcon width={20} height={20} />
					</button>

					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderLeftIcon width={20} height={20} />
					</button>

					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderRightIcon width={20} height={20} />
					</button>

					<button
						type="button"
						className={cn(
							"border w-[30px] h-[30px] flex justify-center items-center"
						)}
					>
						<BorderNoneIcon width={20} height={20} />
					</button>
				</div>

				<div className={cn("w-full flex items-center gap-5 flex-row")}>
					<div
						className={cn(
							"w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
						)}
					>
						<button
							type="button"
							className={cn(
								"border border-dashed cursor-pointer w-full h-[1px]"
							)}
							style={{
								borderBottomColor: sizeValues.borderColor,
							}}
						/>
					</div>

					<div
						className={cn(
							"w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
						)}
					>
						<button
							type="button"
							className={cn(
								"border border-solid cursor-pointer w-full h-[1px]"
							)}
							style={{
								borderBottomColor: sizeValues.borderColor,
							}}
						/>
					</div>

					<div
						className={cn(
							"w-[30px] h-[30px] flex items-center justify-center cursor-pointer"
						)}
					>
						<button
							type="button"
							className={cn(
								"border border-dotted cursor-pointer w-full h-[1px]"
							)}
							style={{
								borderBottomColor: sizeValues.borderColor,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BorderStyles;
