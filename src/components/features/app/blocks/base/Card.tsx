import React from "react";
import { IElementSchema } from "@/components/shared/types/interface-elements";
import { IComponentCardSchema } from "@/components/shared/types/interface-components";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";
import styles from "../../../../styles/card.module.sass";

interface Props {
	data: IComponentCardSchema;
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
			<div style={data.style} className={styles.wrapper}>
				<figure>
					<img
						src={data.content.photo.desktop?.url}
						alt=""
						className={styles.img}
					/>
				</figure>

				<div className={styles.content}>
					{data.elements.map((element: IElementSchema) => {
						return (
							<BaseElementRender
								key={element.id}
								type={element.type}
								data={element}
							/>
						);
					})}
				</div>
			</div>
		</ComponentAction>
	);
};

export default Card;
