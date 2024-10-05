import React from "react";
import ComponentLibrary from "@/components/features/app/modules/components/library/v1/ComponentLibrary";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

/**
 * @author Zholaman Zhumanov
 * @created 23.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const ActionAddComponentSetting: React.FC = () => {
	const dialog = useDialogAction();

	return (
		<DialogContainer
			open={dialog.dialogSettingActionAddComponentAction.open}
			toggle={dialog.dialogSettingActionAddComponentAction.toggle}
		>
			<ComponentLibrary eventType="append" />
		</DialogContainer>
	);
};

export default ActionAddComponentSetting;
