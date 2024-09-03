import React from "react";
import styles from "@/components/styles/card.module.sass";
import { IComponentBaseSchema } from "@/components/shared/types/interface-components";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { cn } from "@/components/lib/utils";
import {useAppSelector} from "@/components/app/store/hooks/hooks";

interface Props {
	data: IComponentBaseSchema;
	activeElement: boolean;
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
	const { data, activeElement } = props;
	console.log(data);

	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	console.log("editorActiveElement", editorActiveElement, data.id)

	return (
		<div
			className={cn(
				`${editorActiveElement === data.id ? "border border-blue-500" : ""}`,
				styles.card
			)}
			style={{ ...data.style }}
			onClick={() => {
				editorActiveElementAction(data.id);
			}}
		>
			<figure>
				<img
					src={data.content.photo.thumbnail.src}
					alt=""
					className={styles.img}
				/>
			</figure>
		</div>
	);
};

export default Card;
