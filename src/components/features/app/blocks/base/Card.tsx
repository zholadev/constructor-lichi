import React from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { IElementSchema } from "@/components/shared/types/interface-elements";
import { IComponentCardSchema } from "@/components/shared/types/interface-components";
import BaseElementRender from "@/components/features/app/elements/container/BaseElementRender";
import { useAppSelector } from "../../../../app/store/hooks/hooks";
import styles from "../../../../styles/card.module.sass";
import { cn } from "../../../../lib/utils";

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

	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement, editorNavigatorHoverId } = useAppSelector(
		(state) => state.editor
	);

	return (
		<div
			className={cn(
				`${editorActiveElement.id === data.id || editorNavigatorHoverId === data.id ? "border-blue-800 border-2 box-border" : "border-box"}`,
				styles.card
			)}
			onClick={() => {
				editorActiveElementAction({
					id: data.id,
					componentData: data,
					containerId,
				});
			}}
		>
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
		</div>
	);
};

export default Card;
