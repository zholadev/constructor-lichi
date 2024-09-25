import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import VideoRender from "@/components/components/video/VideoRender";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import { IComponentCardVideoSchema } from "../types/interface-components";

interface Props {
	data: IComponentCardVideoSchema;
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
	const { data, containerId } = props;

	return (
		<ComponentAction containerId={containerId} data={data}>
			<div style={{ ...data.style }} className={styles.wrapper}>
				<VideoRender data={data} />

				<div className={styles.content}>
					<BaseElementWrapper
						containerId={containerId}
						elementData={data.elements}
						componentData={data}
					/>
				</div>
			</div>
		</ComponentAction>
	);
};

export default Video;
