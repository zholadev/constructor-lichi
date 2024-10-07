import React from "react";
import { cn } from "@/components/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { TemplateType } from "@/components/shared/types/types";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import Divider from "@/components/shared/uikit/divider/Divider";
import { ISchemaPageType } from "@/components/shared/types/interface-schema";

const templatePageTypeData: ISchemaPageType[] = [
	{
		id: 1,
		name: "Page",
		value: "page",
	},
	{
		id: 2,
		name: "Creative",
		value: "creative",
	},
];

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description Компонент для сохранения страницы и дополнительными настройками перед сохранением
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SavePage: React.FC = () => {
	const { spaceModeTemplateTypeAction } = useDispatchAction();

	const { spaceModeTemplateType } = useAppSelector((state) => state.space);

	const dialog = useDialogAction();

	const onSelectTemplateType = (type: TemplateType) => {
		spaceModeTemplateTypeAction(type);
	};

	return (
		<div className={cn("w-full")}>
			<div className={cn("w-full mb-6")}>
				<h3 className={cn("text-xs mb-3 uppercase text-gray-500")}>
					Выберите тип страницы
				</h3>
				<div>
					<Select
						defaultValue={spaceModeTemplateType}
						value={spaceModeTemplateType}
						onValueChange={(value: TemplateType) =>
							onSelectTemplateType(value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите тип страницы" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{templatePageTypeData.map((template, index) => {
									return (
										<SelectItem
											key={index}
											value={template.value}
										>
											{template.name}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<Divider />

			<div className={cn("w-full mb-5 mt-5")}>
				<h3 className={cn("mb-2 font-bold")}>
					Перед тем как сохранить!
				</h3>

				<ul className={cn("list-inside list-disc text-sm")}>
					<li className={cn("mb-1")}>Выбрали тип страницы</li>
					<li className={cn("mb-1")}>
						Создали страницы для всех версий устройств!
					</li>
					<li className={cn("mb-1")}>
						Стилизовали темную тему, чтоб ее включить нужно
						поставить галочку в настройки редактора
					</li>
					<li className={cn("mb-1")}>
						Для всех компонентов проставили видео или картинку для
						вывода
					</li>
				</ul>
			</div>

			<Divider />

			<div
				className={cn(
					"w-full flex items-center gap-3 flex-row justify-end"
				)}
			>
				<Button
					variant="outline"
					onClick={() => dialog.dialogSaveSchema.toggle()}
				>
					Отмена
				</Button>
				<Button onClick={() => dialog.dialogSaveSchema.toggle()}>
					Сохранить
				</Button>
			</div>
		</div>
	);
};

export default SavePage;
