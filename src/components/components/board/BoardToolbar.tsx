"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import {
	DragHandleDots2Icon,
	TokensIcon,
	TrashIcon,
} from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import usePermission from "@/components/shared/hooks/usePermission";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import useActiveElement from "@/components/shared/hooks/useActiveElement";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description Компонент предназначен как шапка для доски с дополнительными действиями для компонентов и контейнеров
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

	const dialog = useDialogAction();

	const permission = usePermission();
	const previewMode = usePreviewMode();
	const activeElementHandle = useActiveElement();

	const { editorDisabledEdit, editorDraggingTemplate, editorRemoveTemplate } =
		useAppSelector((state) => state.editor);

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const toggleEditorDraggingTemplateHandle = () => {
		editorDraggingTemplateAction(!editorDraggingTemplate);
		editorDisabledEditAction(!editorDisabledEdit);
	};

	const toggleEditorRemoveTemplateHandle = () =>
		editorRemoveTemplateAction(!editorRemoveTemplate);

	if (previewMode.previewModeEditor) {
		return null;
	}

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
				<h3
					className={cn(
						"cursor-pointer text-xs border border-dashed p-4 rounded-md"
					)}
				>
					Нажмите сюда чтобы убрать выделение с активного элемента
				</h3>
			</div>
			<div className={cn("flex items-center gap-2")}>
				{permission.widget.root && (
					<Button
						className={cn("text-xs")}
						variant="outline"
						disabled={
							spaceTemplateData.length === 0 ||
							editorDraggingTemplate
						}
						onClick={(e) => {
							e.stopPropagation();

							if (dialog.dialogWidget.open) {
								//@ts-ignore
								activeElementHandle({
									widgetType: "none",
								});
							}

							dialog.dialogWidget.toggle();
						}}
					>
						{dialog.dialogWidget.open ? (
							<div className={cn("flex items-center gap-1")}>
								<TokensIcon /> Закрыть виджеты
							</div>
						) : (
							<div className={cn("flex items-center gap-1")}>
								<TokensIcon /> Добавить виджеты
							</div>
						)}
					</Button>
				)}
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
