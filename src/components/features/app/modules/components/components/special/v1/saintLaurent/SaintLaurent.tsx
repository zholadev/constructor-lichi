import React, { useMemo } from "react";
import MediaContainer from "@/components/shared/uikit/media/MediaContainer";
import BaseElementWrapper from "@/components/features/app/modules/elements/container/v1/BaseElementWrapper";
import ComponentAction from "@/components/features/app/activeElement/wrappers/v1/component/ComponentAction";
import { IComponentTotalDataSchema } from "@/components/features/app/modules/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import useStylesFormatted from "@/components/shared/hooks/useStylesFormatted";
import styles from "./saint-laurent-1.0.0.module.sass";

interface Props {
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	containerId: string;
	componentIndex?: number;
	componentLen?: number;
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
	const {
		componentData,
		containerId,
		containerData,
		componentIndex,
		componentLen,
	} = props;

	const styleFormatted = useStylesFormatted();

	const currentStyleImage = useMemo(() => {
		if (componentLen === 1) {
			return styles.single;
		}
		if (componentIndex === 0) {
			return styles.first;
		}
		if (componentIndex === 1) {
			return styles.second;
		}
		return "";
	}, [componentLen, componentIndex]);

	return (
		<ComponentAction
			containerId={containerId}
			data={componentData}
			cls={styles.saint_laurent_block}
			containerData={containerData}
		>
			<div
				style={{
					...styleFormatted(
						componentData.style,
						!componentData.settings?.view?.darkTheme
					),
				}}
				className={currentStyleImage}
			>
				<figure>
					<MediaContainer
						componentData={componentData}
						containerData={containerData}
						imgAutoHeight
					/>

					<BaseElementWrapper
						containerId={containerId}
						elementData={componentData.elements}
						componentData={componentData}
						staticElement
					/>
				</figure>
			</div>
		</ComponentAction>
	);
};

export default SaintLaurent;
