import React from "react";
import ButtonElement from "@/components/features/app/modules/elements/base/v1/ButtonElement";
import TextElement from "@/components/features/app/modules/elements/base/v1/TextElement";
import ElementAction from "@/components/features/app/activeElement/wrappers/v1/element/ElementAction";
import TimerContainer from "@/components/features/app/modules/elements/base/v1/timer/TimerContainer";
import { SchemaElementTypes } from "@/components/shared/types/types-components";
import {
	ISchemaElementInterfaces,
	ISchemaTimerElement,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";

interface Props {
	type: SchemaElementTypes;
	data: ISchemaElementInterfaces;
	containerId: string;
	componentId: string;
	widgetComponent?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description Компонент для вывода элементов
 * @last-updated
 * @update-description
 * @todo types
 * @fixme
 * @param props
 * @constructor
 */
const BaseElementRender: React.FC<Props> = (props) => {
	const { type, data, containerId, componentId, widgetComponent } = props;

	const renderComponents = () => {
		switch (type) {
			case "button":
				return <ButtonElement data={data} />;
			case "text":
				return <TextElement data={data} />;
			case "timer":
				const timerData = data as ISchemaTimerElement;
				return (
					<TimerContainer
						data={timerData}
						styles={timerData.style}
						targetDate={timerData.settings.timer.targetDate}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<ElementAction
			data={data}
			widgetComponent={widgetComponent}
			containerId={containerId}
			componentId={componentId}
		>
			{renderComponents()}
		</ElementAction>
	);
};

export default BaseElementRender;
