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
	const { editorDisabledEditAction, editorDraggingTemplateAction } =
		useDispatchAction();

	const { editorDisabledEdit, editorDraggingTemplate } = useAppSelector(
		(state) => state.editor
	);

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	const toggleEditorDraggingTemplateHandle = () => {
		editorDraggingTemplateAction(!editorDraggingTemplate);
		editorDisabledEditAction(!editorDisabledEdit);
	};

	return (
		<div
			className={cn(
				"w-full h-[50px] mb-5 bg-white flex items-center justify-end p-2"
			)}
		>
			<Button
				className={cn("")}
				variant="ghost"
				disabled={spaceTemplateData.length === 0}
				onClick={toggleEditorDraggingTemplateHandle}
			>
				<DragHandleDots2Icon />
			</Button>

			<Button
				className={cn("")}
				variant="ghost"
				disabled={spaceTemplateData.length === 0}
			>
				<TrashIcon />
			</Button>
		</div>
	);
};

export default BoardToolbar;
