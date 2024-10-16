import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useToastMessage from "@/components/shared/hooks/useToastMessage";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { useMemo } from "react";
import { errorHandler } from "@/components/entities/errorHandler/errorHandler";
import {
	button_schema_element,
	text_schema_element,
	timer_schema_element,
} from "@/components/app/schema/model/v1/schema-base-elements";

interface LanguageObject {
	[key: string]: { value: string };
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo TS-IGNORE
 * @fixme
 * @constructor
 */
export default function useSchemaElementData(): (
	type: ElementBaseTypes
) => ISchemaElementInterfaces | null {
	const toastMessage = useToastMessage();

	const { languageData } = useAppSelector((state) => state.app);

	const languageObject = useMemo<LanguageObject>(() => {
		if (!Array.isArray(languageData)) {
			errorHandler(
				"useSchemaElementData",
				"languageObject",
				new Error("Invalid languageData format")
			);
			return {};
		}

		return languageData.reduce<Record<string, { value: string }>>(
			(acc, lang) => {
				acc[lang.id] = { value: lang.name };
				return acc;
			},
			{}
		);
	}, [languageData]);

	const elementMap: Record<ElementBaseTypes, ISchemaElementInterfaces> = {
		button: {
			// @ts-ignore
			...button_schema_element(),
			content: {
				// @ts-ignore
				title: {
					...languageObject,
				},
			},
		},
		text: {
			// @ts-ignore
			...text_schema_element(),
			content: {
				// @ts-ignore
				title: {
					...languageObject,
				},
			},
		},
		timer: {
			// @ts-ignore
			...timer_schema_element(),
		},
	};

	return (type: ElementBaseTypes): ISchemaElementInterfaces | null => {
		if (!type || !elementMap[type]) {
			toastMessage("Не найдено тип данных или отсутствует тип!", "error");
			return null;
		}

		return elementMap[type];
	};
}
