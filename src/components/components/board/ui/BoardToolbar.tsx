"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

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
	} = useDispatchAction();

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
			className={cn(
				"w-full h-[50px] mb-5 bg-white flex items-center justify-end p-2"
			)}
		>
			<Button
				className={cn("")}
				variant="ghost"
				disabled={spaceTemplateData.length < 2 || editorRemoveTemplate}
				onClick={toggleEditorDraggingTemplateHandle}
			>
				{editorDraggingTemplate ? "Назад" : <DragHandleDots2Icon />}
			</Button>

			<Button
				className={cn("")}
				variant="ghost"
				onClick={toggleEditorRemoveTemplateHandle}
				disabled={
					spaceTemplateData.length === 0 || editorDraggingTemplate
				}
			>
				{editorRemoveTemplate ? "Назад" : <TrashIcon />}
			</Button>
		</div>
	);
};

export default BoardToolbar;
