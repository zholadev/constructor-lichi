import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { IButtonElement } from "../types/interface-elements";

interface Props {
	data: IButtonElement;
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

	if (!data) {
		return null;
	}

	return (
		<button type="button" style={data.style}>
			{data.content.title[spaceModeLanguage].value}
		</button>
	);
};

export default ButtonElement;
