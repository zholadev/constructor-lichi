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
import TemplateAddButton from "@/components/features/app/template/TemplateAddButton";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-templates";
import BaseComponentRender from "@/components/features/app/blocks/container/BaseComponentRender";
import ContainerAction from "@/components/features/app/components/actions/container/ContainerAction";

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
	const { editorRemoveTemplate, editorNavigatorHoverId } = useAppSelector(
		(state) => state.editor
	);

	console.log("spaceTemplateData", spaceTemplateData);

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{spaceTemplateData.map((container: ITemplateBaseSchema) => {
				return (
					<div key={container.id} className={cn("w-full relative")}>
						{editorRemoveTemplate && (
							<div
								className={cn(
									"w-full h-full hover:bg-red-500 opacity-50 duration-75 z-10 absolute ease-in-out top-0 left-0 transition-all flex justify-center items-center"
								)}
								onClick={() =>
									templateEvent.deleteContainer(container.id)
								}
							/>
						)}
						<ContextMenu>
							<ContextMenuTrigger>
								<ContainerAction containerId={container.id}>
									<div
										className={cn("size-full")}
										style={{
											...container.style,
										}}
									>
										{container.components.map(
											(component) => {
												return (
													<BaseComponentRender
														key={component.id}
														template={container}
														data={component.data}
														type={
															component.data?.type
														}
														currentItemData={
															component
														}
													/>
												);
											}
										)}
									</div>
								</ContainerAction>
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
