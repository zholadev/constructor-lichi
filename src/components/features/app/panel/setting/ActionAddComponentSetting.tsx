import React from "react";
import AddBaseComponent from "@/components/features/app/components/add/AddBaseComponent";
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
			<AddBaseComponent eventType="append" />
		</DialogContainer>
	);
};

export default ActionAddComponentSetting;
