import React from "react";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import { IComponentTotalDataSchema } from "../types/interface-components";
import styles from "../../../../styles/card.module.sass";

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

	return (
		<ComponentAction containerId={containerId} data={componentData}>
			<div style={{ ...componentData.style }} className={styles.wrapper}>
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
