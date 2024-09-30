import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IElementTotal } from "../types/interface-elements";

interface Props {
	data: IElementTotal;
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
const ButtonElement: React.FC<Props> = (props) => {
	const { data } = props;

	const { spaceModeLanguage } = useAppSelector((state) => state.space);

	const styleFormatted = useStylesFormatted();

	if (!data) {
		return null;
	}

	return (
		<button type="button" style={{ ...styleFormatted(data.style) }}>
			{data.content.title[spaceModeLanguage].value}
		</button>
	);
};

export default ButtonElement;
