"use client";

import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shared/shadcn/ui/context-menu";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import TemplateAddButton from "@/components/features/app/ContainerTemplate/TemplateAddButton";
import BaseComponentRender from "@/components/features/app/blocks/container/BaseComponentRender";
import ContainerAction from "@/components/features/app/components/actions/container/ContainerAction";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import usePermission from "@/components/shared/hooks/usePermission";

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, editor mode container, delete console
 * @fixme
 * @constructor
 */
const BoardContainer: React.FC = () => {
	const templateEvent = useTemplateEvent();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);

	const styleFormatted = useStylesFormatted();
	const permission = usePermission();
	const activeElementData = useActiveElementFollowUp();

	useMemo(() => {
		console.log("spaceTemplateData", spaceTemplateData);
		console.log("activeElementData", activeElementData);
		console.log("permission", permission);
	}, [spaceTemplateData, activeElementData]);

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{spaceTemplateData.map((container: ISchemaContainer) => {
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

						<ContainerAction containerId={container.id}>
							<div
								className={cn("size-full")}
								style={{
									...styleFormatted(container.style),
								}}
							>
								{container.components.map((component) => {
									return (
										<BaseComponentRender
											key={component.id}
											containerData={container}
											componentData={component.data}
											type={component.data?.type}
											componentId={component.id}
										/>
									);
								})}
							</div>
						</ContainerAction>
					</div>
				);
			})}
			<TemplateAddButton />
		</div>
	);
};

export default BoardContainer;
