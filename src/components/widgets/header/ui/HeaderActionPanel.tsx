"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Switch } from "@/components/shared/shadcn/ui/switch";
import { Label } from "@/components/shared/shadcn/ui/label";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { Eye, SaveIcon, SettingsIcon } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/shared/shadcn/ui/select";
import { ILangListDataItem } from "@/components/shared/types/interface";
import DialogContainer from "@/components/widgets/dialog/ui/DialogContainer";
import SaveSchemaContent from "@/components/entities/schema/ui/SaveSchemaContent";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import EditorSetting from "@/components/components/editor/ui/components/EditorSetting";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderActionPanel: React.FC<Props> = (props) => {
	const {} = props;

	const { spaceModeThemeAction, spaceModeLanguageAction } =
		useDispatchAction();

	const dialog = useDialogAction();

	const { languageData } = useAppSelector((state) => state.app);
	const { spaceModeTheme, spaceModeDeviceType, spaceModeLanguage } =
		useAppSelector((state) => state.space);

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

			<Button variant="outline">
				<Eye />
			</Button>

			<Button
				onClick={() => dialog.dialogSaveSchema.toggle()}
				type="button"
				className={cn("flex items-center gap-2 text-xs")}
			>
				<SaveIcon width={20} height={20} /> Сохранить
			</Button>

			<Button
				onClick={() => dialog.dialogEditorSetting.toggle()}
				type="button"
				className={cn("flex items-center gap-2 text-xs")}
			>
				<SettingsIcon width={20} height={20} /> Настройки редактора
			</Button>

			<DialogContainer
				open={dialog.dialogSaveSchema.open}
				toggle={dialog.dialogSaveSchema.toggle}
				title="Сохранить страницу"
			>
				<SaveSchemaContent />
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
