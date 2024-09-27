import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import { IComponentTotalDataSchema } from "../types/interface-components";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
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
	const { componentData, containerId, containerData } = props;

	return (
		<ComponentAction data={componentData} containerId={containerId}>
			<div style={{ ...componentData.style }} className={styles.wrapper}>
				<MediaContainer componentData={componentData} />

				<BaseElementWrapper
					containerId={containerId}
					elementData={componentData.elements}
					componentData={componentData}
					staticElement
				/>
			</div>
		</ComponentAction>
	);
};

export default CardOutside;
