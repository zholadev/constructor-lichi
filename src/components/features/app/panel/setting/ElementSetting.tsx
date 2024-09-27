import React, { useEffect } from "react";
import {
	ISchemaSettingsElement,
	SchemaSettingElementPositionX,
	SchemaSettingElementPositionY,
} from "@/components/shared/types/interface-schema-settings";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { cn } from "@/components/lib/utils";
import {
	AlignItems,
	JustifyContent,
} from "@/components/features/app/panel/styles/LayoutStyles";
import {Input} from "@/components/shared/shadcn/ui/input";

interface Props {
	settingValue?: ISchemaSettingsElement;
	onSettingChange?: (value: ISchemaSettingsElement) => void;
}

interface ElementSettings {
	positionX: SchemaSettingElementPositionX;
	positionY: SchemaSettingElementPositionY;
	justifyContent: JustifyContent;
	alignItems: AlignItems;
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
			positionX: "center",
			positionY: "bottom",
			style: {
				justifyContent: "center",
				alignItems: "flex-end",
			},
		});

	const onSettingUpdateHandle = (
		key: keyof ElementSettings,
		value:
			| JustifyContent
			| AlignItems
			| SchemaSettingElementPositionX
			| SchemaSettingElementPositionY
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

			if (key === "justifyContent" || key === "alignItems") {
				updatedValues.style = {
					...updatedValues.style,
					[key]: value as JustifyContent | AlignItems,
				};
			} else {
				updatedValues[key] = value;
			}
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
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
						onSettingUpdateHandle("alignItems", "flex-start");
						onSettingUpdateHandle("positionX", "left");
						onSettingUpdateHandle("positionY", "top");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
						onSettingUpdateHandle("alignItems", "center");
						onSettingUpdateHandle("positionX", "center");
						onSettingUpdateHandle("positionY", "top");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-start");
						onSettingUpdateHandle("alignItems", "flex-end");
						onSettingUpdateHandle("positionX", "right");
						onSettingUpdateHandle("positionY", "top");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
						onSettingUpdateHandle("alignItems", "flex-start");
						onSettingUpdateHandle("positionX", "left");
						onSettingUpdateHandle("positionY", "center");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
						onSettingUpdateHandle("alignItems", "center");
						onSettingUpdateHandle("positionX", "center");
						onSettingUpdateHandle("positionY", "center");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "center");
						onSettingUpdateHandle("alignItems", "flex-end");
						onSettingUpdateHandle("positionX", "right");
						onSettingUpdateHandle("positionY", "center");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
						onSettingUpdateHandle("alignItems", "flex-start");
						onSettingUpdateHandle("positionX", "center");
						onSettingUpdateHandle("positionY", "bottom");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
						onSettingUpdateHandle("alignItems", "center");
						onSettingUpdateHandle("positionX", "center");
						onSettingUpdateHandle("positionY", "bottom");
					}}
				/>
				<button
					type="button"
					className={cn("w-full h-[7px] bg-gray-500 cursor-pointer")}
					onClick={() => {
						onSettingUpdateHandle("justifyContent", "flex-end");
						onSettingUpdateHandle("alignItems", "flex-end");
						onSettingUpdateHandle("positionX", "right");
						onSettingUpdateHandle("positionY", "bottom");
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
		<div className={cn("w-full")}>
			<div>
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

			<div>
				<h3 className={cn("uppercase text-xs mb-3 text-gray-500")}>
					Расстояние
				</h3>

				<Input />
			</div>
		</div>
	);
};

export default ElementSetting;
