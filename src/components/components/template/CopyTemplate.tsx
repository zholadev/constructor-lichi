import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import { IDeviceType } from "@/components/shared/types/interface";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { Button } from "@/components/shared/shadcn/ui/button";
import useCopyTemplateAction from "@/components/shared/hooks/useCopyTemplateAction";
import { DeviceType } from "@/components/shared/types/types";

const deviceTypesList: IDeviceType[] = [
	{
		id: 1,
		name: "Не выбрано",
		value: "unknown",
	},
	{
		id: 2,
		name: "desktop",
		value: "desktop",
	},
	{
		id: 3,
		name: "tablet",
		value: "tablet",
	},
	{
		id: 4,
		name: "mobile",
		value: "mobile",
	},
];

interface ICopyTemplate {
	from: DeviceType;
	to: DeviceType;
}

const defaultParams: ICopyTemplate = {
	from: "unknown",
	to: "unknown",
};

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description Компонент для копирования шаблона
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const CopyTemplate: React.FC = () => {
	const dialog = useDialogAction();

	const copyTemplateAction = useCopyTemplateAction();

	const [deviceTypeForm, setDeviceTypeForm] =
		useState<ICopyTemplate>(defaultParams);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeHandle = (key: string, value: string) => {
		setDeviceTypeForm((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод подтверждения для копирования шаблона
	 */
	const onConfirmHandle = () => {
		copyTemplateAction(deviceTypeForm.from, deviceTypeForm.to);
		setDeviceTypeForm(defaultParams);
	};

	return (
		<DialogContainer
			open={dialog.dialogCopyTemplate.open}
			toggle={dialog.dialogCopyTemplate.toggle}
		>
			<div className={cn("w-full")}>
				<h3 className={cn("mb-7 uppercase text-gray-500")}>
					Копирование шаблона!
				</h3>

				<div className={cn("w-full mb-5")}>
					<h4 className={cn("mb-4 text-sm")}>Откуда:</h4>

					<Select
						defaultValue={deviceTypeForm.from}
						value={deviceTypeForm.from}
						onValueChange={(value) => onChangeHandle("from", value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите устройство" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{deviceTypesList.map((device) => {
									return (
										<SelectItem
											key={device.value}
											value={device.value}
										>
											{device.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className={cn("w-full mb-5")}>
					<h4 className={cn("mb-4 text-sm")}>Куда:</h4>

					<Select
						defaultValue={deviceTypeForm.to}
						value={deviceTypeForm.to}
						onValueChange={(value) => onChangeHandle("to", value)}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите устройство" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{deviceTypesList.map((device) => {
									return (
										<SelectItem
											key={device.value}
											value={device.value}
										>
											{device.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>

				<div className={cn("w-full mb-5 flex justify-end gap-2")}>
					<Button
						variant="outline"
						onClick={dialog.dialogCopyTemplate.toggle}
					>
						Отмена
					</Button>
					<Button variant="default" onClick={onConfirmHandle}>
						Подтвердить
					</Button>
				</div>
			</div>
		</DialogContainer>
	);
};

export default CopyTemplate;
