import React from "react";
import AddBaseComponent from "@/components/features/app/components/add/AddBaseComponent";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 23.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ActionAddComponentSetting: React.FC<Props> = (props) => {
	const {} = props;

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
