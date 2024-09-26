import React from "react";
import { IElementTotal } from "@/components/features/app/elements/types/interface-elements";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import { IComponentTotalDataSchema } from "@/components/features/app/blocks/types/interface-components";

interface Props {
	containerId: string;
	elementData: IElementTotal[];
	componentData: IComponentTotalDataSchema;
}

/**
 * @author Zholaman Zhumanov
 * @created 18.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const BaseElementWrapper: React.FC<Props> = (props) => {
	const { elementData, containerId, componentData } = props;

	if (!elementData) {
		return null;
	}

	return elementData.map((element) => {
		return (
			<BaseElementRender
				key={element.id}
				type={element.type}
				data={element}
				containerId={containerId}
				componentId={componentData.id}
				timerData={element?.setting?.timer?.targetDate}
			/>
		);
	});
};

export default BaseElementWrapper;
