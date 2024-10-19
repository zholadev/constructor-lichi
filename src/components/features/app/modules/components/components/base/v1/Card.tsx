import React from "react";
import BaseElementWrapper from "@/components/features/app/modules/elements/container/v1/BaseElementWrapper";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import styles from "@/components/styles/card.module.sass";

interface Props<T extends ISchemaComponent> {
	componentData: T;
	containerData: ISchemaContainer;
	containerId: string;
	widgetComponent?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 02.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const Card = <T extends ISchemaComponent>(
	props: Props<T>
): React.JSX.Element => {
	const { componentData, containerId, containerData, widgetComponent } =
		props;

	const styleFormatted = useStylesFormatted();

	return (
		<div
			style={{
				...styleFormatted(
					componentData.style,
					!componentData.settings?.view?.darkTheme
				),
			}}
			className={styles.wrapper}
		>
			<MediaContainer
				containerData={containerData}
				componentData={componentData}
			/>

			<BaseElementWrapper
				containerId={containerId}
				elementData={componentData.elements ?? []}
				componentData={componentData}
				widgetComponent={widgetComponent}
			/>
		</div>
	);
};

export default Card;
