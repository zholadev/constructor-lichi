import React from "react";
import styles from "@/components/styles/card.module.sass";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import BaseElementWrapper from "@/components/features/app/elements/container/BaseElementWrapper";
import { IComponentCardSchema } from "../types/interface-components";

interface Props {
	data: IComponentCardSchema;
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
	const { data, containerId } = props;

	return (
		<ComponentAction data={data} containerId={containerId}>
			<div style={{ ...data.style }} className={styles.wrapper}>
				<figure>
					<img
						src={data.content.photo.desktop?.url}
						alt=""
						className={styles.img}
					/>
				</figure>

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

export default Album;
