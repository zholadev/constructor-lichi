import React, { useMemo } from "react";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import BaseElementRender from "@/components/features/app/modules/elements/container/v1/BaseElementRender";
import styles from "@/components/styles/card.module.sass";
import { cn } from "@/components/lib/utils";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	containerId: string;
	elementData: ISchemaElementInterfaces[];
	componentData: ISchemaComponent;
	staticElement?: boolean;
	widgetComponent?: boolean;
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
	const {
		elementData,
		containerId,
		componentData,
		staticElement,
		widgetComponent,
	} = props;

	/**
	 * @author Zholaman Zhumanov
	 * @description Получаем стили с настроек element.style из компонента
	 */
	const style = useMemo((): object => {
		return componentData?.settings?.element?.style ?? {};
	}, [componentData]);

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
			style={style}
		>
			{elementData.map((element) => {
				return (
					<BaseElementRender
						key={element.id}
						elementData={element}
						type={element.type}
						containerId={containerId}
						componentId={componentData.id ?? ""}
						widgetComponent={widgetComponent}
					/>
				);
			})}
		</div>
	);
};

export default BaseElementWrapper;
