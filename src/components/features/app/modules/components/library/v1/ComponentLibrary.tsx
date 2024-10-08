"use client";

import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import Divider from "@/components/shared/uikit/divider/Divider";
import { Button } from "@/components/shared/shadcn/ui/button";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import useSchemaComponentData from "@/components/shared/hooks/useSchemaComponentData";
import {
	IComponentBaseAddList,
	IComponentSpecialAddList,
} from "@/components/shared/types/interface-templates";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useWidgetActions from "@/components/shared/hooks/actions/useWidgetActions";
import useComponentActions from "@/components/shared/hooks/actions/useComponentActions";

const baseData: IComponentBaseAddList[] = [
	{
		id: 1,
		type: "card",
		version: versionComponentBase.card.version,
	},
	{
		id: 2,
		type: "card_outside",
		version: versionComponentBase.card_outside.version,
	},
	{
		id: 5,
		type: "album",
		version: versionComponentBase.album.version,
	},
	{
		id: 6,
		type: "album_outside",
		version: versionComponentBase.album_outside.version,
	},
];

const specialData: IComponentSpecialAddList[] = [
	{
		id: 1,
		type: "saint_laurent",
		version: versionComponentBase.card.version,
	},
];

type AddBaseEvent = "new" | "append";

interface IAddBaseComponent {
	eventType: AddBaseEvent;
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

	const widgetActions = useWidgetActions();
	const componentActions = useComponentActions();

	const getSchemaComponent = useSchemaComponentData();

	const { editorAddComponentType, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	const [selectComponent, setSelectComponent] =
		useState<ComponentBaseTypes | null>(null);

	const getSelectComponent = (data: ComponentBaseTypes | null) =>
		setSelectComponent(data);

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
										getSelectComponent(component.type)
									}
									className={cn(
										"w-full h-[150px]",
										selectComponent === component.type
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
										getSelectComponent(component.type)
									}
									className={cn(
										"w-full h-[150px]",
										selectComponent === component.type
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
					onClick={() => {
						if (dialogAddComponentAction)
							dialogAddComponentAction(false);
						if (dialogSettingActionAddComponentAction)
							dialogSettingActionAddComponentAction(false);

						if (editorAdditionalActiveElement === "stories") {
							widgetActions.widgetCreateComponent(
								getSchemaComponent(selectComponent)
							);
							return;
						}

						eventType === "new"
							? componentActions.componentCreate(
									getSchemaComponent(selectComponent)
								)
							: componentActions.componentAppend(
									getSchemaComponent(selectComponent)
								);
					}}
				>
					Подтвердить
				</Button>
			</div>
		</div>
	);
};

export default ComponentLibrary;
