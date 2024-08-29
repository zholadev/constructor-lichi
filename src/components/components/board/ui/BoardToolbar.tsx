"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DragHandleDots2Icon, TrashIcon } from "@radix-ui/react-icons";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const BoardToolbar: React.FC<Props> = (props) => {
	const {} = props;

	const { editorDisabledEditAction, editorDraggingTemplateAction } =
		useDispatchAction();

	const { editorDisabledEdit, editorDraggingTemplate } = useAppSelector(
		(state) => state.editor
	);

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
				onClick={toggleEditorDraggingTemplateHandle}
			>
				<DragHandleDots2Icon />
			</Button>

			<Button className={cn("")} variant="ghost">
				<TrashIcon />
			</Button>
		</div>
	);
};

export default BoardToolbar;
