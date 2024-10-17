import React, { useMemo } from "react";
import ButtonElement from "@/components/features/app/modules/elements/base/v1/ButtonElement";
import TextElement from "@/components/features/app/modules/elements/base/v1/TextElement";
import ElementAction from "@/components/features/app/activeElement/wrappers/v1/element/ElementAction";
import TimerContainer from "@/components/features/app/modules/elements/base/v1/timer/TimerContainer";
import { SchemaElementTypes } from "@/components/shared/types/types-components";
import {
	ISchemaElementInterfaces,
	ISchemaTimerElement,
} from "@/components/features/app/modules/elements/types/v1/interface-elements";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { ISchemaContentText } from "@/components/shared/types/interface-schema-content";

interface Props {
	type: SchemaElementTypes;
	elementData: ISchemaElementInterfaces;
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
	const { type, elementData, containerId, componentId, widgetComponent } =
		props;

	const { spaceModeLanguage } = useAppSelector((state) => state.space);

	const title = useMemo((): string => {
		const spaceModeLanguageKey =
			spaceModeLanguage as keyof ISchemaContentText;

		// @ts-ignore
		return elementData?.content?.title?.[spaceModeLanguageKey]?.value ?? "";
	}, [elementData, spaceModeLanguage]);

	const timerData = useMemo(() => {
		return elementData as ISchemaTimerElement;
	}, [elementData]);

	const renderComponents = () => {
		switch (type) {
			case "button":
				return <ButtonElement data={elementData} title={title} />;
			case "text":
				return <TextElement data={elementData} title={title} />;
			case "timer":
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
			data={elementData}
			widgetComponent={widgetComponent}
			containerId={containerId}
			componentId={componentId}
		>
			{renderComponents()}
		</ElementAction>
	);
};

export default BaseElementRender;
