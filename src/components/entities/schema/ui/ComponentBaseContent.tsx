"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import Divider from "@/components/shared/uikit/divider/ui/Divider";
import { IComponentBaseList } from "@/components/shared/types/interface-components";
import { Button } from "@/components/shared/shadcn/ui/button";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import useSchemaData from "@/components/shared/hooks/useSchemaData";

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
		id: 3,
		type: "card_outside_left",
		version: versionComponentBase.card_outside_left.version,
		style: {},
		elements: [],
	},
	{
		id: 4,
		type: "card_outside_right",
		version: versionComponentBase.card_outside_right.version,
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

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ComponentBaseContent: React.FC = () => {
	const templateEvent = useTemplateEvent();

	const getSchemaComponent = useSchemaData();

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
								onClick={() => {
									templateEvent.addComponent(
										getSchemaComponent(component.type)
									);
								}}
								className={cn("w-full h-[150px]")}
							>
								{component.type}
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ComponentBaseContent;
