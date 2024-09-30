import React from "react";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import { IComponentTotalDataSchema } from "@/components/features/app/blocks/types/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import styles from "../../../styles/v1/saint-laurent-1.0.0.module.sass";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 27.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SaintLaurent: React.FC<Props> = (props) => {
	const { componentData, containerId, containerData } = props;

	return (
		<ComponentAction containerId={containerId} data={componentData}>
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

export default SaintLaurent;
