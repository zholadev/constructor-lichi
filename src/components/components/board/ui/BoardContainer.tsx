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
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/shared/shadcn/ui/button";

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
	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const templateEvent = useTemplateEvent();

	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{Object.values(spaceTemplateData).map(
				(template: ITemplateBaseSchema, index: number) => {
					return (
						<div key={index} className={cn("w-full relative")}>
							{editorRemoveTemplate && (
								<div
									className={cn(
										"w-full h-full hover:bg-red-500 opacity-50 duration-75 absolute ease-in-out top-0 left-0 transition-all flex justify-center items-center"
									)}
									onClick={() =>
										templateEvent.deleteContainer(
											template.id
										)
									}
								>
									<Button
										className={cn("")}
										variant="ghost"
										disabled={
											spaceTemplateData.length === 0
										}
										onClick={() =>
											templateEvent.deleteContainer(
												template.id
											)
										}
									>
										<TrashIcon width={40} height={40} />
									</Button>
								</div>
							)}
							<ContextMenu>
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
									<ContextMenuItem>
										Переместить
									</ContextMenuItem>
								</ContextMenuContent>
							</ContextMenu>
						</div>
					);
				}
			)}
			<TemplateAddButton />
		</div>
	);
};

export default BoardContainer;
