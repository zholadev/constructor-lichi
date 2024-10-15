import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import {
	AnimationTypes,
	ISchemaAnimationParams,
} from "@/components/shared/types/interface-schema-content";
import { Label } from "@/components/shared/shadcn/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { Button } from "@/components/shared/shadcn/ui/button";

interface Props {
	defaultData: ISchemaAnimationParams;
	onUpdateSchemaHandle: (value: ISchemaAnimationParams) => void;
	onRemoveSchemaHandle: () => void;
}

interface IAnimationData {
	id: number;
	name: string;
	value: AnimationTypes;
}

const animateData: IAnimationData[] = [
	{
		id: 1,
		name: "Нет",
		value: "none",
	},
	{
		id: 2,
		name: "Отдаление",
		value: "zoom_out",
	},
	{
		id: 3,
		name: "Приближение",
		value: "zoom_in",
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 10.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const AnimationContent: React.FC<Props> = (props) => {
	const { defaultData, onUpdateSchemaHandle, onRemoveSchemaHandle } = props;

	const toastMessage = useToastMessage();

	const [schemaValue, setSchemaValue] = useState<ISchemaAnimationParams>({
		observer: true,
		type: "none",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (
		key: keyof ISchemaAnimationParams,
		value: AnimationTypes | boolean
	) => {
		if (!key || value == null) {
			toastMessage("ValueError: value or key is not defined", "error");
			return;
		}
		setSchemaValue((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (onUpdateSchemaHandle) onUpdateSchemaHandle(updateValues);

			return updateValues;
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для удаления контента с данных
	 */
	const removeSchemaHandle = () => {
		if (!onRemoveSchemaHandle) {
			toastMessage(
				"Нет функции для удаления контента! Передайте функцию для удаления!",
				"error"
			);
			return;
		}

		onRemoveSchemaHandle();
	};

	useEffect(() => {
		if (!defaultData) return;
		setSchemaValue(defaultData);
	}, [defaultData]);

	return (
		<div className={cn("w-full p-1")}>
			<div className={cn("flex justify-end")}>
				<Button
					onClick={removeSchemaHandle}
					className={cn("text-xs mb-4")}
					variant="outline"
				>
					Удалить анимацию
				</Button>
			</div>
			<div className={cn("w-full mb-5")}>
				<h3 className={cn("text-xs mb-4 uppercase text-gray-500")}>
					Выберите анимацию
				</h3>
				<Select
					defaultValue={schemaValue.type}
					value={schemaValue.type}
					onValueChange={(value: AnimationTypes) =>
						onChangeHandle("type", value)
					}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Выберите анимацию" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							{animateData.map((animate, index) => {
								return (
									<SelectItem
										key={index}
										value={animate.value}
									>
										{animate.name}
									</SelectItem>
								);
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>

			<div
				className={cn(
					"flex justify-between items-center  cursor-pointer flex-row gap-2 mb-3"
				)}
			>
				<Label htmlFor="animation-observer-switch">
					<h3 className={cn("text-xs uppercase text-gray-500")}>
						Observer
					</h3>
				</Label>
				<div
					className={cn("flex w-full items-center justify-end gap-2")}
				>
					<Switch
						id="animation-observer-switch"
						checked={schemaValue.observer}
						onCheckedChange={(value) => {
							onChangeHandle("observer", value);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimationContent;
