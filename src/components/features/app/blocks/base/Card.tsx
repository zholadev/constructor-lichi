import React from "react";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import VideoRender from "@/components/components/video/VideoRender";
import { IComponentTotalDataSchema } from "../types/interface-components";
import styles from "../../../../styles/card.module.sass";

interface Props {
	data: IComponentTotalDataSchema;
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
	const { data, containerId } = props;

	return (
		<ComponentAction containerId={containerId} data={data}>
			<div style={{ ...data.style }} className={styles.wrapper}>
				{data?.settings?.view?.contentType === "video" ? (
					<VideoRender data={data} />
				) : (
					<figure>
						<img
							src={data.content.photo.desktop?.url}
							alt=""
							className={styles.img}
						/>
					</figure>
				)}

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

export default Card;
