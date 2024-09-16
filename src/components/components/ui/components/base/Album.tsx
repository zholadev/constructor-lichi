import React from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { IElementSchema } from "@/components/shared/types/interface-elements";
import BaseElementRender from "@/components/components/ui/elements/container/BaseElementRender";
import { IComponentCardSchema } from "@/components/shared/types/interface-components";

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

	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return (
		<div
			className={cn(
				`${editorActiveElement.id === data.id ? "border-blue-800 border-2" : ""}`,
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
			<div style={{ ...data.style }} className={styles.wrapper}>
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

export default Album;
