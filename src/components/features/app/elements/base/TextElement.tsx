import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ITextElement } from "../types/interface-elements";

interface Props {
	data: ITextElement;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const TextElement: React.FC<Props> = (props) => {
	const { data } = props;

	const { spaceModeLanguage } = useAppSelector((state) => state.space);

	if (!data) {
		return null;
	}

	return (
		<h2 style={data.style}>
			{data.content.title[spaceModeLanguage].value}
		</h2>
	);
};

export default TextElement;
