"use client";

import React from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/shared/shadcn/ui/dialog";
import { Button } from "@/components/shared/shadcn/ui/button";
import { cn } from "@/components/lib/utils";
import TemplateAddTypeDisplay from "./components/TemplateAddTypeDisplay";

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
const TemplateAddDialog: React.FC = () => {
	const { dialogAddTemplateAction, editorAddComponentTypeAction } =
		useDispatchAction();

	const { dialogAddTemplate } = useAppSelector((state) => state.dialog);
	const { editorAddComponentType } = useAppSelector((state) => state.editor);

	const toggleDialogHandle = () => {
		editorAddComponentTypeAction("initial");
		dialogAddTemplateAction(!dialogAddTemplate);
	};

	return (
		<Dialog open={dialogAddTemplate} onOpenChange={toggleDialogHandle}>
			<Button onClick={toggleDialogHandle}>Создать страницу</Button>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className={cn("text-md")}>
						Добавить контейнер
					</DialogTitle>
				</DialogHeader>

				<TemplateAddTypeDisplay type={editorAddComponentType} />
			</DialogContent>
		</Dialog>
	);
};

export default TemplateAddDialog;
