import React from "react";
import { ElementBaseTypes } from "@/components/shared/types/types-components";
import ButtonElement from "@/components/features/app/ui/elements/base/ButtonElement";
import TextElement from "@/components/features/app/ui/elements/base/TextElement";
import ElementAction from "@/components/features/app/components/actions/element/ElementAction";
import TimerContainer from "@/components/features/app/ui/elements/base/timer/TimerContainer";
import {IButtonElement, IElementTotal, ITextElement} from "../types/interface-elements";

interface Props {
	type: ElementBaseTypes;
	data: IElementTotal;
	containerId: string;
	componentId: string;
	timerData?: string | Date;
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
	const { type, data, containerId, componentId, timerData } = props;

	const renderComponents = () => {
		switch (type) {
			case "button":
				return <ButtonElement data={data} />;
			case "text":
				return <TextElement data={data} />;
			case "timer":
				return (
					<TimerContainer
						targetDate={timerData}
						styles={data.style}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<ElementAction
			data={data}
			containerId={containerId}
			componentId={componentId}
		>
			{renderComponents()}
		</ElementAction>
	);
};

export default BaseElementRender;
