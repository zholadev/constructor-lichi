import React from "react";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import { IButtonElement } from "@/components/shared/types/interface-elements";
import ButtonElement from "@/components/features/app/elements/base/ButtonElement";
import TextElement from "@/components/features/app/elements/base/TextElement";

interface Props {
	type: ElementBaseTypes;
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
const BaseElementRender: React.FC<Props> = (props) => {
	const { type, data } = props;

	const renderComponents = () => {
		switch (type) {
			case "button":
				return <ButtonElement data={data} />;
			case "text":
				return <TextElement data={data} />;
			default:
				return null;
		}
	};

	return renderComponents();
};

export default BaseElementRender;
