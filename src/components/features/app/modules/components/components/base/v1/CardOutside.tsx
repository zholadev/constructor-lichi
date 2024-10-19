import React from "react";
import styles from "@/components/styles/card.module.sass";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import BaseElementWrapper from "@/components/features/app/modules/elements/container/v1/BaseElementWrapper";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	componentData: ISchemaComponent;
	containerData: ISchemaContainer;
	containerId: string;
	widgetComponent?: boolean;
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
const CardOutside: React.FC<Props> = (props) => {
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
				containerId={containerId ?? ""}
				elementData={componentData.elements ?? []}
				componentData={componentData}
				staticElement
				widgetComponent={widgetComponent}
			/>
		</div>
	);
};

export default CardOutside;
