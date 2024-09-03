import React from "react";
import { cn } from "@/components/lib/utils";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shared/shadcn/ui/context-menu";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-components";
import TemplateAddButton from "@/components/components/editor/ui/components/TemplateAddButton";
import BaseComponentRender from "@/components/components/ui/base/BaseComponentRender";

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const BoardContainer: React.FC = () => {
	const { spaceTemplateData } = useAppSelector((state) => state.space);
	console.log("spaceTemplateData", spaceTemplateData)
	return (
		<div className={cn("h-full overflow-y-auto")}>
			{Object.values(spaceTemplateData).map(
				(template: ITemplateBaseSchema, index: number) => {
					return (
						<ContextMenu key={index}>
							<ContextMenuTrigger>
								<div
									key={index}
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
					);
				}
			)}
			<TemplateAddButton />
		</div>
	);
};

export default BoardContainer;
