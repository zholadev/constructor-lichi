import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

/**
 * @author Zholaman Zhumanov
 * @created 01.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useActiveDarkThemeSetting(): boolean | undefined {
	const activeElementData = useActiveElementObserver();

	const { spaceModeTheme } = useAppSelector((state) => state?.space);

	return useMemo((): boolean | undefined => {
		try {
			return (
				spaceModeTheme === "dark" &&
				activeElementData?.selectActiveData?.settings?.view?.darkTheme
			);
		} catch (error) {
			errorHandler("useActiveDarkThemeSetting", "memo", error);
			return false;
		}
	}, [activeElementData, spaceModeTheme]);
}
