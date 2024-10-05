import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import useEditorEvent from "@/components/shared/hooks/useEditorEvent";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import usePermission from "@/components/shared/hooks/usePermission";
import ActionAddComponentSetting from "@/components/features/app/modules/editor/setting/ActionAddComponentSetting";

/**
 * @author Zholaman Zhumanov
 * @created 20.09.2024
 * @description Компонент для удаления или добавить (только компонент в контейнер) компонентов, элементов и контейнеров с редактора
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ActionSetting: React.FC = () => {
	const permission = usePermission();
	const dialog = useDialogAction();
	const editorEvent = useEditorEvent();

	return (
		<div className={cn("w-full px-1 mb-3")}>
			<div className={cn("w-full flex flex-col gap-3")}>
				{permission.setting.action.add && (
					<Button
						type="button"
						variant="outline"
						onClick={
							dialog.dialogSettingActionAddComponentAction.toggle
						}
					>
						Добавить
					</Button>
				)}
				{permission.setting.action.remove && (
					<Button
						type="button"
						variant="destructive"
						onClick={editorEvent.removeEvent}
					>
						Удалить
					</Button>
				)}
			</div>

			<ActionAddComponentSetting />
		</div>
	);
};

export default ActionSetting;
