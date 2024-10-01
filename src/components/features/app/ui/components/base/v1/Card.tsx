import React from "react";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/ui/elements/container/BaseElementWrapper";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IComponentTotalDataSchema } from "../../types/v1/interface-components";
import styles from "../../../../../../styles/card.module.sass";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
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
const Card: React.FC<Props> = (props) => {
	const { componentData, containerId, containerData } = props;

	const styleFormatted = useStylesFormatted();

	return (
		<ComponentAction containerId={containerId} data={componentData}>
			<div
				style={{ ...styleFormatted(componentData.style) }}
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

export default Card;
