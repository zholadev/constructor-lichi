import React from "react";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import ButtonElement from "@/components/components/ui/elements/base/ButtonElement";
import { IButtonElement } from "@/components/shared/types/interface-elements";

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
			default:
				return null;
		}
	};

	return renderComponents();
};

export default BaseElementRender;
