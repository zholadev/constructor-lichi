import React, { useEffect, useState } from "react";
import { cn } from "@/components/lib/utils";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import {
	ISchemaAnimateParams,
	MotionTypes,
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
	defaultParams: ISchemaAnimateParams;
	onSendParams: (value: ISchemaAnimateParams) => void;
	onRemoveParams: () => void;
}

interface IMotionData {
	id: number;
	name: string;
	value: MotionTypes;
}

const animateData: IMotionData[] = [
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
	const { defaultParams, onSendParams, onRemoveParams } = props;

	const toastMessage = useToastMessage();

	const [contentParams, setContentParams] = useState<ISchemaAnimateParams>({
		observer: true,
		type: "none",
	});

	const onChangeContentParams = (
		key: keyof ISchemaAnimateParams,
		value: MotionTypes | boolean
	) => {
		if (!key || value == null) {
			toastMessage("ValueError: value or key is not defined", "error");
			return;
		}
		setContentParams((prevState) => {
			const updateValues = {
				...prevState,
				[key]: value,
			};

			if (onSendParams) onSendParams(updateValues);

			return updateValues;
		});
	};

	useEffect(() => {
		if (defaultParams) {
			setContentParams(defaultParams);
		}
	}, [defaultParams]);

	return (
		<div className={cn("w-full p-1")}>
			<div className={cn("flex justify-end")}>
				<Button
					onClick={onRemoveParams}
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
					defaultValue={contentParams.type}
					value={contentParams.type}
					onValueChange={(value: MotionTypes) =>
						onChangeContentParams("type", value)
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
						checked={contentParams?.observer}
						onCheckedChange={(value) => {
							onChangeContentParams("observer", value);
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnimationContent;
