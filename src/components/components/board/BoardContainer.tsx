"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shared/shadcn/ui/context-menu";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import TemplateAddButton from "@/components/components/editor/TemplateAddButton";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import BaseComponentRender from "@/components/features/app/blocks/container/BaseComponentRender";

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, editor mode container
 * @fixme
 * @constructor
 */
const BoardContainer: React.FC = () => {
	const templateEvent = useTemplateEvent();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);

	console.log("spaceTemplateData", spaceTemplateData);

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{spaceTemplateData.map((template: ITemplateBaseSchema) => {
				return (
					<div key={template.id} className={cn("w-full relative")}>
						{editorRemoveTemplate && (
							<div
								className={cn(
									"w-full h-full hover:bg-red-500 opacity-50 duration-75 z-10 absolute ease-in-out top-0 left-0 transition-all flex justify-center items-center"
								)}
								onClick={() =>
									templateEvent.deleteContainer(template.id)
								}
							/>
						)}
						<ContextMenu>
							<ContextMenuTrigger>
								<div
									className={cn("border w-full min-h-80")}
									style={{
										...template.style,
									}}
								>
									{template.components.map((item) => {
										return (
											<BaseComponentRender
												key={item.id}
												data={item?.data}
												template={template}
												type={item.data?.type}
												currentItemData={item}
											/>
										);
									})}
								</div>
							</ContextMenuTrigger>
							<ContextMenuContent>
								<ContextMenuItem>Удалить</ContextMenuItem>
								<ContextMenuItem>Переместить</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					</div>
				);
			})}
			<TemplateAddButton />
		</div>
	);
};

export default BoardContainer;
