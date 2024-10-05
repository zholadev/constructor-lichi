import React from "react";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import BaseElementRender from "@/components/features/app/modules/elements/container/v1/BaseElementRender";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import styles from "@/components/styles/card.module.sass";
import { cn } from "@/components/lib/utils";

interface Props {
	containerId: string;
	elementData: IElementTotal[];
	componentData: IComponentTotalDataSchema;
	staticElement?: boolean;
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
	const { elementData, containerId, componentData, staticElement } = props;


	if (!elementData) {
		return null;
	}

	return (
		<div
			className={cn(
				[],
				staticElement
					? styles.element_wrapper_static
					: styles.element_wrapper
			)}
			style={{ ...componentData.settings.element.style }}
		>
			{elementData.map((element) => {
				return (
					<BaseElementRender
						data={element}
						key={element.id}
						type={element.type}
						containerId={containerId}
						componentId={componentData.id}
						timerData={element?.settings?.timer?.targetDate}
					/>
				);
			})}
		</div>
	);
};

export default BaseElementWrapper;
