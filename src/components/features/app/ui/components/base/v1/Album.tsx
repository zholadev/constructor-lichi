import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/ui/elements/container/BaseElementWrapper";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IComponentTotalDataSchema } from "../../types/v1/interface-components";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
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
	const { componentData, containerId, containerData } = props;

	const styleFormatted = useStylesFormatted();

	return (
		<ComponentAction data={componentData} containerId={containerId}>
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

export default Album;
