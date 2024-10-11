import { useMemo } from "react";
import { ISchemaAnimateParams } from "@/components/shared/types/interface-schema-content";

/**
 * @author Zholaman Zhumanov
 * @created 11.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 * @param animation
 * @param trigger
 */
export default function useAnimateClass(
	animation: ISchemaAnimateParams,
	trigger: boolean
): string {
	return useMemo(() => {
		// Если observer активен, то смотрим на trigger, если нет — игнорируем trigger
		if (animation.observer) {
			if (animation.type === "zoom_out" && trigger) {
				return "animation__zoom_out";
			}
			if (animation.type === "zoom_in" && trigger) {
				return "animation__zoom_in";
			}
		} else {
			// Если observer не активен, возвращаем класс анимации только по типу
			if (animation.type === "zoom_out") {
				return "animation__zoom_out";
			}
			if (animation.type === "zoom_in") {
				return "animation__zoom_in";
			}
		}
		return "";
	}, [animation, trigger]);
}
