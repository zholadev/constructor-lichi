import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useChangeDeviceTemplateAction(): (
	value: DeviceType,
	copyTemplate: boolean
) => void {
	const {
		spaceModeDeviceTypeAction,
		spaceTemplateDataAction,
		editorActiveElementAction,
	} = useDispatchAction();

	const toastMessage = useToastMessage();

	const { spaceTemplateSchemaDevicesData } = useAppSelector(
		(state) => state.space
	);

	return (value: DeviceType, copyTemplate: boolean = false) => {
		if (!value) {
			toastMessage(
				"Не выбрано устройство! useChangeDeviceTemplate",
				"error"
			);
			return;
		}

		spaceModeDeviceTypeAction(value);

		if (value === "desktop" || value === "laptop") {
			editorActiveElementAction({ type: "" });

			if (copyTemplate) return;
			spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.desktop);
		} else if (value === "tablet") {
			editorActiveElementAction({ type: "" });

			if (copyTemplate) return;
			spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.tablet);
		} else if (value === "mobile") {
			editorActiveElementAction({ type: "" });

			if (copyTemplate) return;
			spaceTemplateDataAction(spaceTemplateSchemaDevicesData?.mobile);
		}
	};
}
