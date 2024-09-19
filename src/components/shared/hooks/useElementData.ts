import { v4 as uuidv4 } from "uuid";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { versionComponentBase } from "@/components/app/versions/version-modules";
import {
	IButtonElement,
	IElementSchema,
	ITextElement,
} from "@/components/features/app/elements/types/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";

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
export default function useElementData():
	| IElementSchema
	| IButtonElement
	| ITextElement {
	const toastMessage = useToastMessage();

	const { languageData } = useAppSelector((state) => state.app);

	const languageObject = useMemo(() => {
		try {
			return languageData.reduce(
				(acc, lang) => {
					acc[lang.id] = { value: lang.name };
					return acc;
				},
				{} as Record<string, { value: string }>
			);
		} catch (error) {
			if (error instanceof Error) {
				errorHandler("useElementData", "languageObject", error);
			}
		}
	}, [languageData]);

	const elementMap: Record<
		ElementBaseTypes,
		IElementSchema | IButtonElement | ITextElement
	> = {
		button: {
			id: uuidv4(),
			type: "button",
			version: versionComponentBase.card.version,
			style: {
				border: "1px solid #ffffff",
				padding: "10px 15px",
			},
			content: {
				title: {
					...languageObject,
				},
			},
		},
		text: {
			id: uuidv4(),
			type: "text",
			version: versionComponentBase.card.version,
			style: {
				textAlign: "center",
				fontFamily: "Futura PT",
			},
			content: {
				title: {
					...languageObject,
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
