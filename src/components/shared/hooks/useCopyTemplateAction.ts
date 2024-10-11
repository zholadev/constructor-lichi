import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import useChangeDeviceTemplateAction from "@/components/shared/hooks/useChangeDeviceTemplateAction";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useDialogAction from "@/components/shared/hooks/useDialogAction";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description Хук для копирования шаблона
 * @last-updated
 * @update-description
 * @todo Удалить ts-ignore
 * @fixme
 * @constructor
 */
export default function useCopyTemplateAction(): (
	from: DeviceType,
	to: DeviceType
) => void {
	const dialog = useDialogAction();
	const toastMessage = useToastMessage();

	const { spaceTemplateSchemaDevicesDataAction } = useDispatchAction();

	const { spaceTemplateSchemaDevicesData } = useAppSelector(
		(state) => state.space
	);

	const changeDeviceType = useChangeDeviceTemplateAction();

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для копирования шаблона
	 * @param source
	 * @param target
	 */
	const copyTemplate = (source: DeviceType, target: DeviceType) => {
		spaceTemplateSchemaDevicesDataAction(
			target,
			spaceTemplateSchemaDevicesData?.[source]
		);
		changeDeviceType(target, true);
		dialog.dialogCopyTemplate.toggle();
	};

	return (from: DeviceType, to: DeviceType) => {
		if (!from || !to || from === "unknown" || to === "unknown") {
			toastMessage("Вы не выбрали устройство!", "error");
			return;
		}

		if (from === to) {
			toastMessage(
				"Выбранные устройства не могут быть одинаковыми!",
				"error"
			);
			return;
		}

		// @ts-ignore
		const deviceMap: Record<DeviceType, DeviceType[]> = {
			desktop: ["tablet", "mobile"],
			tablet: ["desktop", "mobile"],
			mobile: ["desktop", "tablet"],
		};

		if (deviceMap[from]?.includes(to)) {
			copyTemplate(from, to);
		}
	};
}
