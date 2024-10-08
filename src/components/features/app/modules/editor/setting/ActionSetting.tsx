import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import usePermission from "@/components/shared/hooks/usePermission";
import useRemoveActions from "@/components/shared/hooks/actions/useRemoveActions";
import ActionAddComponentSetting from "@/components/features/app/modules/editor/setting/ActionAddComponentSetting";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import useRemoveWidgetActions from "@/components/shared/hooks/actions/useRemoveWidgetActions";

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
	const removeActions = useRemoveActions();
	const removeWidgetActions = useRemoveWidgetActions();

	const activeElementData = useActiveElementObserver();

	const removeClickHandle = () => {
		if (activeElementData?.widgetType === "stories") {
			removeWidgetActions.removeWidget();
			return;
		}

		removeActions.remove();
	};

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
						onClick={removeClickHandle}
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
