import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { isCheckSchemaButtonElement } from "@/components/features/app/modules/typeCheck/typeCheckElement";
import {
	ISchemaElementInterfaces,
	ISchemaTextElement,
} from "../../types/v1/interface-elements";

interface Props<T extends ISchemaElementInterfaces> {
	data: T;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ButtonElement: React.FC<Props<ISchemaTextElement>> = (props) => {
	const { data } = props;

	const { spaceModeLanguage } = useAppSelector((state) => state.space);

	const styleFormatted = useStylesFormatted();

	if (!data) {
		return null;
	}

	if (!isCheckSchemaButtonElement(data)) {
		return <div>Invalid element type</div>;
	}

	return (
		<button
			type="button"
			style={{
				...styleFormatted(data.style, !data.settings?.view.darkTheme),
			}}
		>
			{data?.content?.title?.[spaceModeLanguage]?.value ??
				"Default Title"}
		</button>
	);
};

export default ButtonElement;
