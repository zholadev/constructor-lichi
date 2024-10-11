import React, { useEffect } from "react";
import {
	ISchemaSettingsElement,
	SchemaSettingElementPositionX,
	SchemaSettingElementPositionY,
} from "@/components/shared/types/interface-schema-settings";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/shared/shadcn/ui/input";
import {
	AlignItems,
	JustifyContent,
} from "@/components/features/app/modules/editor/styles/PositionStyles";
import { ArrowRightIcon, ArrowDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";

interface Props {
	settingValue?: ISchemaSettingsElement;
	onSettingChange?: (value: ISchemaSettingsElement) => void;
}

interface ElementSettings {
	justifyContent: JustifyContent;
	alignItems: AlignItems;
	gap: number;
	flexDirection: "column" | "row";
}

/**
 * @author Zholaman Zhumanov
 * @created 26.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ElementSetting: React.FC<Props> = (props) => {
	const { onSettingChange, settingValue } = props;

	const toastMessage = useToastMessage();

	const [elementSettingValue, setElementSettingValue] =
		React.useState<ISchemaSettingsElement>({
			style: {
				justifyContent: "center",
				alignItems: "flex-end",
				gap: 0,
				flexDirection: "column",
			},
		});

	const onSettingUpdateHandle = (
		key: keyof ElementSettings,
		value:
			| JustifyContent
			| AlignItems
			| SchemaSettingElementPositionX
			| SchemaSettingElementPositionY
			| number
			| string
	) => {
		if (!key || !value) {
			toastMessage(
				`ValueError: ${!key ? "key" : "value"} is not defined`,
				"error"
			);
			return;
		}

		setElementSettingValue((prevState) => {
			let updatedValues = { ...prevState };

			updatedValues.style = {
				...updatedValues.style,
				[key]: value,
			};

			if (onSettingChange) onSettingChange(updatedValues);

			return updatedValues;
		});
	};

	const AutoLayout: React.FC = () => {
		return (
			<div
				className={cn(
					"grid grid-cols-3 w-full h-full justify-center items-center gap-5"
				)}
			>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
						onSettingUpdateHandle("alignItems", "flex-start");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
						onSettingUpdateHandle("alignItems", "center");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75",
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
					}}
				/>
				<button
					type="button"
					className={cn(
						"w-full h-[7px] bg-gray-500 cursor-pointer transition-all duration-75"
					)}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
					}}
				/>
			</div>
		);
	};

	useEffect(() => {
		if (settingValue) {
			setElementSettingValue({
				...settingValue,
			});
		}
	}, [settingValue]);

	return (
		<div className={cn("w-full px-1")}>
			<div className={cn("w-full mb-5")}>
				<h3 className={cn("uppercase text-xs mb-8 text-gray-500")}>
					Позиционирование
				</h3>
				<div
					className={cn(
						"size-full flex justify-center items-center my-3"
					)}
				>
					<div
						className={cn(
							"border w-[80px] h-[80px] rounded-md flex justify-center p-2 items-center"
						)}
					>
						<AutoLayout />
					</div>
				</div>
			</div>

			<div className={cn("w-full mb-5")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Направление элементов
				</h3>

				<div className={cn("w-full flex flex-row gap-3")}>
					<Button
						type="button"
						variant={
							elementSettingValue.style.flexDirection === "column"
								? "default"
								: "outline"
						}
						className={cn(
							"flex items-center flex-row gap-1 text-xs rounded-md"
						)}
						onClick={() => {
							onSettingUpdateHandle("flexDirection", "column");
						}}
					>
						<ArrowDownIcon /> <span>column</span>
					</Button>
					<Button
						type="button"
						variant={
							elementSettingValue.style.flexDirection === "row"
								? "default"
								: "outline"
						}
						className={cn(
							"flex items-center flex-row gap-1 text-xs rounded-md"
						)}
						onClick={() => {
							onSettingUpdateHandle("flexDirection", "row");
						}}
					>
						<ArrowRightIcon /> <span>row</span>
					</Button>
				</div>
			</div>

			<div className={cn("w-full")}>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Расстояние между элементами
				</h3>

				<Input
					type="number"
					value={elementSettingValue.style.gap}
					defaultValue={elementSettingValue.style.gap}
					onChange={(e) =>
						onSettingUpdateHandle("gap", parseFloat(e.target.value))
					}
				/>
			</div>
		</div>
	);
};

export default ElementSetting;
