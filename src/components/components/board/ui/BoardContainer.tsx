import React from "react";
import { cn } from "@/components/lib/utils";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/shared/shadcn/ui/context-menu";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import BoardEmptyCard from "@/components/components/board/ui/BoardEmptyCard";
import { ITemplateBaseSchema } from "@/components/shared/types/interface-components";
import TemplateAddButton from "@/components/components/editor/ui/components/TemplateAddButton";

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

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{Object.values(spaceTemplateData).map(
				(template: ITemplateBaseSchema, index: number) => {
					return (
						<ContextMenu key={index}>
							<ContextMenuTrigger>
								<div
									key={index}
									className={cn("border w-full h-80")}
									style={{
										...template.style,
									}}
								>
									{template.components.map((item) => {
										return (
											<BoardEmptyCard
												item={item}
												template={template}
												key={item.id}
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
