import {useAppSelector} from "@/components/app/store/hooks/hooks";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import {useMemo} from "react";
import {errorHandler} from "@/components/entities/errorHandler/errorHandler";

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
export default function useActiveDarkThemeSetting(): boolean {
	const activeElementData = useActiveElementFollowUp();

	const { spaceModeTheme } = useAppSelector((state) => state?.space);

	return useMemo(() => {
		try {
			return (
				spaceModeTheme === "dark" &&
				activeElementData.data?.settings?.view?.darkTheme
			);
		} catch (error) {
			errorHandler("useActiveDarkThemeSetting", "memo", error);
		}
	}, [activeElementData, spaceModeTheme])
}
