import React from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import {
	IComponentCardSchema,
	IComponentCardVideoSchema,
} from "@/components/features/app/blocks/types/interface-components";

interface Props {
	children: React.ReactNode;
	data: IComponentCardSchema | IComponentCardVideoSchema;
	containerId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 17.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ComponentAction: React.FC<Props> = (props) => {
	const { children, data, containerId } = props;

	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement, editorNavigatorHoverId } = useAppSelector(
		(state) => state.editor
	);

	return (
		<div className={cn("size-full relative")}>
			<div
				className={cn(
					`${editorActiveElement.id === data.id || editorNavigatorHoverId === data.id ? "border-emerald-400 border-2 box-border" : "border-box"}`,
					styles.card
				)}
				onClick={() => {
					editorActiveElementAction({
						id: data.id,
						containerId,
						type: "component",
						style: data?.style,
						componentData: data,
						currentActiveId: data.id,
					});
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default ComponentAction;
