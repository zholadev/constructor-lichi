import React from "react";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { IElementSchema } from "@/components/shared/types/interface-elements";
import { IComponentCardSchema } from "@/components/shared/types/interface-components";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import ComponentAction from "@/components/features/app/components/actions/component/ComponentAction";

interface Props {
	data: IComponentCardSchema;
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

				<div className={cn("w-full flex-col")}>
					{data.elements.map((element: IElementSchema) => {
						return (
							<BaseElementRender
								key={element.id}
								type={element.type}
								data={element}
								containerId={containerId}
								componentId={data.id}
							/>
						);
					})}
				</div>
			</div>
		</ComponentAction>
	);
};

export default CardOutside;
