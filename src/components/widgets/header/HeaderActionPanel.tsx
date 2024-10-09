"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { Eye, SaveIcon, SettingsIcon } from "lucide-react";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import SavePage from "@/components/components/editor/SavePage";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import EditorSetting from "@/components/components/editor/EditorSetting";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const HeaderActionPanel: React.FC = () => {
	const dialog = useDialogAction();

	const { editorPreviewModeAction } = useDispatchAction();

	const {
		spaceModeTheme,
		spaceModeDeviceType,
		spaceModeLanguage,
		spaceTemplateData,
	} = useAppSelector((state) => state.space);

	const { editorPreviewMode } = useAppSelector((state) => state.editor);

	const togglePreviewModeHandle = () =>
		editorPreviewModeAction(!editorPreviewMode);

	return (
		<div className={cn("flex items-center p-2 gap-4")}>
			<div
				className={cn(
					"uppercase text-xs text-gray-600 w-auto flex items-center gap-3 flex-row"
				)}
			>
				<span>{spaceModeDeviceType}</span> |{" "}
				<span>{spaceModeTheme}</span> | <span>{spaceModeLanguage}</span>
			</div>

			<Button
				disabled={spaceTemplateData?.length === 0}
				variant="outline"
				className={cn("text-xs")}
				onClick={dialog.dialogSchemaView.toggle}
			>
				Посмотреть схему
			</Button>

			<Button
				disabled={spaceTemplateData?.length === 0}
				variant="outline"
				className={cn("text-xs flex gap-1 items-center flex-row")}
				onClick={togglePreviewModeHandle}
			>
				<Eye width={20} height={20} /> Просмотр в редакторе
			</Button>

			<Button
				variant="outline"
				onClick={() => dialog.dialogEditorSetting.toggle()}
				type="button"
				className={cn("flex items-center gap-2 text-xs")}
			>
				<SettingsIcon width={20} height={20} /> Настройки редактора
			</Button>

			<Button
				onClick={() => dialog.dialogSaveSchema.toggle()}
				type="button"
				className={cn("flex items-center gap-2 text-xs")}
			>
				<SaveIcon width={20} height={20} /> Сохранить
			</Button>

			<DialogContainer
				open={dialog.dialogSaveSchema.open}
				toggle={dialog.dialogSaveSchema.toggle}
				title="Сохранить страницу"
			>
				<SavePage />
			</DialogContainer>

			<DialogContainer
				open={dialog.dialogEditorSetting.open}
				toggle={dialog.dialogEditorSetting.toggle}
			>
				<EditorSetting />
			</DialogContainer>
		</div>
	);
};

export default HeaderActionPanel;
