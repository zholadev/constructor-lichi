import { v4 as uuidv4 } from "uuid";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import {
	IButtonElement,
	IElementSchema,
} from "@/components/shared/types/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
export default function useElementData(): IElementSchema | IButtonElement {
	const toastMessage = useToastMessage();

	const elementMap: Record<
		ElementBaseTypes,
		IElementSchema | IButtonElement
	> = {
		button: {
			id: uuidv4(),
			type: "button",
			version: versionComponentBase.card.version,
			style: {
				border: "1px solid #ffffff",
				padding: "10px 15px",
				color: "#ffffff",
			},
			content: {
				title: {
					ru: {
						value: "Текст",
					},
				},
			},
		},
	};

	return function (
		type: ElementBaseTypes
	): IElementSchema | IButtonElement | undefined {
		if (!type || !elementMap[type]) {
			toastMessage("Не найдено тип данных или отсутствует тип!", "error");
			return undefined;
		}

		return elementMap[type];
	};
}
