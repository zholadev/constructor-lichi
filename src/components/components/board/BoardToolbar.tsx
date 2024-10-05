"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import usePermission from "@/components/shared/hooks/usePermission";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const BoardToolbar: React.FC = () => {
	const {
		editorDisabledEditAction,
		editorDraggingTemplateAction,
		editorRemoveTemplateAction,
		editorActiveElementAction,
	} = useDispatchAction();

	const permission = usePermission();

	const { editorDisabledEdit, editorDraggingTemplate, editorRemoveTemplate } =
		useAppSelector((state) => state.editor);

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const toggleEditorDraggingTemplateHandle = () => {
		editorDraggingTemplateAction(!editorDraggingTemplate);
		editorDisabledEditAction(!editorDisabledEdit);
	};

	const toggleEditorRemoveTemplateHandle = () =>
		editorRemoveTemplateAction(!editorRemoveTemplate);

	return (
		<div
			onClick={() => {
				editorActiveElementAction({ type: "" });
			}}
			className={cn(
				"w-full h-[50px] mb-5 flex items-center justify-between p-2 gap-2"
			)}
		>
			<div className="flex items-center justify-center flex-row text-sm text-muted-foreground">
				<h3 className={cn("cursor-pointer")}>
					Нажмите сюда чтобы убрать выделение с активного элемента
				</h3>
			</div>
			<div className={cn("flex items-center gap-2")}>
				{permission.editor.dnd && (
					<Button
						className={cn("text-xs")}
						variant="outline"
						disabled={
							spaceTemplateData.length < 2 || editorRemoveTemplate
						}
						onClick={toggleEditorDraggingTemplateHandle}
					>
						{editorDraggingTemplate ? (
							"Назад"
						) : (
							<div className={cn("flex items-center gap-1")}>
								<DragHandleDots2Icon /> Переместить контейнеры
							</div>
						)}
					</Button>
				)}

				{permission.editor.remove && (
					<Button
						className={cn("text-xs")}
						variant="destructive"
						onClick={toggleEditorRemoveTemplateHandle}
						disabled={
							spaceTemplateData.length === 0 ||
							editorDraggingTemplate
						}
					>
						{editorRemoveTemplate ? (
							"Назад"
						) : (
							<div className={cn("flex items-center gap-1")}>
								<TrashIcon /> Удалить контейнеры
							</div>
						)}
					</Button>
				)}
			</div>
		</div>
	);
};

export default BoardToolbar;
