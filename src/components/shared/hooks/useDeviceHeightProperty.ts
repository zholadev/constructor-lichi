import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useCallback } from "react";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description Хук для получения высоты для компонентов
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useDeviceHeightProperty(): (
	heightFull: boolean
) => string {
	const { spaceModeDeviceType } = useAppSelector((state) => state.space);
	const { editorHeightProperty } = useAppSelector((state) => state.editor);

	return useCallback(
		(heightFull: boolean) => {
			if (spaceModeDeviceType === "desktop" && heightFull) {
				return "100vh";
			}

			if (heightFull) {
				return editorHeightProperty;
			}
			return "100%";
		},
		[spaceModeDeviceType, editorHeightProperty]
	);
}
