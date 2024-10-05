import React from "react";
import ComponentAction from "@/components/features/app/activeElement/wrappers/v1/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/modules/elements/container/v1/BaseElementWrapper";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import styles from "../../../../../../../styles/card.module.sass";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
	additionalActiveEvent?: boolean;
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
	const { componentData, containerId, containerData, additionalActiveEvent } =
		props;

	const styleFormatted = useStylesFormatted();

	return (
		<ComponentAction
			containerId={containerId}
			data={componentData}
			additionalActiveEvent={additionalActiveEvent}
			containerData={containerData}
		>
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

export default Card;
