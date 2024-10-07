import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/activeElement/wrappers/v1/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/modules/elements/container/v1/BaseElementWrapper";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
	widgetComponent?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 16.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const Album: React.FC<Props> = (props) => {
	const { componentData, containerId, containerData, widgetComponent } = props;

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
				componentData={componentData}
				containerData={containerData}
			/>

			<BaseElementWrapper
				containerId={containerId}
				elementData={componentData.elements}
				componentData={componentData}
				widgetComponent={widgetComponent}
			/>
		</div>
	);
};

export default Album;
