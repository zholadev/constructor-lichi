"use client";

import React, { useState } from "react";
import { cn } from "@/components/lib/utils";
import Divider from "@/components/shared/uikit/divider/Divider";
import { Button } from "@/components/shared/shadcn/ui/button";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import useSchemaComponentData from "@/components/shared/hooks/useSchemaComponentData";
import { IComponentBaseList } from "@/components/shared/types/interface-templates";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";

const baseData: IComponentBaseList[] = [
	{
		id: 1,
		type: "card",
		version: versionComponentBase.card.version,
		style: {},
		elements: [],
	},
	{
		id: 2,
		type: "card_outside",
		version: versionComponentBase.card_outside.version,
		style: {},
		elements: [],
	},
	{
		id: 5,
		type: "album",
		version: versionComponentBase.album.version,
		style: {},
		elements: [],
	},
	{
		id: 6,
		type: "album_outside",
		version: versionComponentBase.album_outside.version,
		style: {},
		elements: [],
	},
	{
		id: 7,
		type: "video",
		version: versionComponentBase.video.version,
		style: {},
		elements: [],
	},
	{
		id: 8,
		type: "video_outside",
		version: versionComponentBase.video_outside.version,
		style: {},
		elements: [],
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
 * @todo refactoring
 * @fixme
 * @constructor
 */
const AddBaseComponent: React.FC<IAddBaseComponent> = (props) => {
	const { eventType = "new" } = props;
	const { dialogAddComponentAction, dialogSettingActionAddComponentAction } =
		useDispatchAction();

	const editorEvent = useEditorEvent();
	const templateEvent = useTemplateEvent();

	const getSchemaComponent = useSchemaComponentData();

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

						eventType === "new"
							? templateEvent.addComponent(
									getSchemaComponent(selectComponent)
								)
							: editorEvent.appendComponent(
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

export default AddBaseComponent;
