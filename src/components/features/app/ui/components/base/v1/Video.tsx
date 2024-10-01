import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/ui/elements/container/BaseElementWrapper";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IComponentTotalDataSchema } from "../../types/v1/interface-components";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 17.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, poster fix
 * @fixme
 * @param props
 * @constructor
 */
const Video: React.FC<Props> = (props) => {
	const { componentData, containerId, containerData } = props;

	const styleFormatted = useStylesFormatted();

	return (
		<ComponentAction containerId={containerId} data={componentData}>
			<div
				style={{
					...styleFormatted(
						componentData.style,
						!componentData.settings?.view?.darkTheme
					),
				}}
				className={styles.wrapper}
			>
				<MediaContainer componentData={componentData} />

				<BaseElementWrapper
					containerId={containerId}
					elementData={componentData.elements}
					componentData={componentData}
				/>
			</div>
		</ComponentAction>
	);
};

export default Video;
