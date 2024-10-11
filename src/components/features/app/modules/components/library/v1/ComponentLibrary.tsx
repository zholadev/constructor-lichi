"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/components/lib/utils";
import Divider from "@/components/shared/uikit/divider/Divider";
import { Button } from "@/components/shared/shadcn/ui/button";
import useSchemaComponentData from "@/components/shared/hooks/useSchemaComponentData";
import {
	IComponentBaseAddList,
	IComponentSpecialAddList,
} from "@/components/shared/types/interface-templates";
import {
	ComponentBaseTypes,
	ComponentSpecialTypes,
} from "@/components/shared/types/types-components";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useWidgetActions from "@/components/shared/hooks/actions/useWidgetActions";
import useComponentActions from "@/components/shared/hooks/actions/useComponentActions";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { versionComponents } from "@/components/app/versions/types/interface-version-components";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";

const baseData: IComponentBaseAddList[] = [
	{
		id: 1,
		type: "card",
	},
	{
		id: 2,
		type: "card_outside",
	},
	{
		id: 5,
		type: "album",
	},
	{
		id: 6,
		type: "album_outside",
	},
];

const specialData: IComponentSpecialAddList[] = [
	{
		id: 1,
		type: "saint_laurent",
	},
];

type AddBaseEvent = "new" | "append";

interface IAddBaseComponent {
	eventType: AddBaseEvent;
}

interface IComponentValue {
	componentType: ComponentBaseTypes | ComponentSpecialTypes;
	version: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Рефакторинг
 * @fixme
 * @constructor
 */
const ComponentLibrary: React.FC<IAddBaseComponent> = (props) => {
	const { eventType = "new" } = props;
	const { dialogAddComponentAction, dialogSettingActionAddComponentAction } =
		useDispatchAction();

	const toastMessage = useToastMessage();
	const widgetActions = useWidgetActions();
	const componentActions = useComponentActions();

	const getSchemaComponent = useSchemaComponentData();

	const { editorAddComponentType, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	const [componentValue, setComponentValue] = useState<IComponentValue>({
		componentType: "none",
		version: "",
	});

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для обновления данных
	 * @param key
	 * @param value
	 */
	const onChangeValue = (
		key: keyof IComponentValue,
		value: ComponentSpecialTypes | ComponentBaseTypes | string
	) => {
		if (!key || !value) {
			toastMessage(
				"ValueError: key or value is not defined! onChangeValue - ComponentLibrary",
				"error"
			);
		}

		setComponentValue((prevState) => {
			return {
				...prevState,
				[key]: value,
			};
		});
	};

	/**
	 * @author Zholaman Zhumanov
	 * @description Данные версий выбранного компонента
	 */
	const getVersionComponent = useMemo(() => {
		return versionComponents?.[componentValue.componentType] ?? [];
	}, [componentValue]);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для подтверждения добавления компонента в контейнер
	 */
	const onConfirmClickHandle = () => {
		if (
			!componentValue.componentType ||
			componentValue.componentType === "none"
		) {
			toastMessage("Ошибка! Вы не выбрали тип компонента!", "error");
			return;
		}
		if (!componentValue.version) {
			toastMessage(
				"Ошибка! Вы не выбрали версию для компонента!",
				"error"
			);
			return;
		}
		if (dialogAddComponentAction) dialogAddComponentAction(false);
		if (dialogSettingActionAddComponentAction)
			dialogSettingActionAddComponentAction(false);

		if (editorAdditionalActiveElement === "stories") {
			widgetActions.widgetCreateComponent(
				getSchemaComponent(
					componentValue.componentType,
					componentValue.version
				)
			);
			return;
		}

		if (eventType === "new") {
			componentActions.componentCreate(
				getSchemaComponent(
					componentValue.componentType,
					componentValue.version
				)
			);
		} else {
			componentActions.componentAppend(
				getSchemaComponent(
					componentValue.componentType,
					componentValue.version
				)
			);
		}
	};

	return (
		<div className={cn("w-full")}>
			<h2 className={cn("text-sm mb-2")}>Компоненты</h2>
			<p className={cn("text-xs text-gray-400")}>
				Выберите компонент чтоб добавить ее в выбранной блок!
			</p>

			<Divider spacing="large" />

			{editorAddComponentType === "saint_laurent" ? (
				<ul className={cn("p-0 m-0 list-none grid grid-cols-3 gap-2")}>
					{specialData.map((component) => {
						return (
							<li key={component.id}>
								<Button
									variant="outline"
									onClick={() =>
										onChangeValue(
											"componentType",
											component.type
										)
									}
									className={cn(
										"w-full h-[150px]",
										componentValue.componentType ===
											component.type
											? "border-blue-500"
											: ""
									)}
								>
									{component.type}
								</Button>
							</li>
						);
					})}
				</ul>
			) : (
				<ul className={cn("p-0 m-0 list-none grid grid-cols-3 gap-2")}>
					{baseData.map((component) => {
						return (
							<li key={component.id}>
								<Button
									variant="outline"
									onClick={() =>
										onChangeValue(
											"componentType",
											component.type
										)
									}
									className={cn(
										"w-full h-[150px]",
										componentValue.componentType ===
											component.type
											? "border-blue-500"
											: ""
									)}
								>
									{component.type}
								</Button>
							</li>
						);
					})}
				</ul>
			)}

			<div className="grid grid-cols-1 gap-3 mb-7 mt-4">
				<h3 className={cn("text-sm")}>Выберите версию компонента</h3>
				<div className={cn("w-full")}>
					<Select
						defaultValue={componentValue.version}
						value={componentValue.version}
						disabled={
							getVersionComponent?.length === 0 ||
							componentValue.componentType === "none"
						}
						onValueChange={(value) =>
							onChangeValue("version", value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{getVersionComponent.map((version) => {
									return (
										<SelectItem
											key={version.version}
											value={version.version}
										>
											{version.version}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>

			<div
				className={cn(
					"flex flex-row items-center justify-end w-full my-4 gap-4"
				)}
			>
				<Button variant="outline" type="button">
					Отмена
				</Button>

				<Button
					variant="default"
					type="button"
					onClick={onConfirmClickHandle}
				>
					Подтвердить
				</Button>
			</div>
		</div>
	);
};

export default ComponentLibrary;
