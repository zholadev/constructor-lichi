import React from "react";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { IComponentTotalDataSchema } from "@/components/features/app/blocks/types/interface-components";
import SelectionElementOverlay from "@/components/features/app/components/actions/selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data?: IComponentTotalDataSchema;
	containerId: string;
	componentType: "container" | "swiper";
}

/**
 * @author Zholaman Zhumanov
 * @created 19.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ContainerAction: React.FC<Props> = (props) => {
	const { children, data, containerId, componentType } = props;

	const activeElementHandle = useActiveElement();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return (
		<div className={cn("size-full relative")}>
			<div
				className={cn(
					`${editorActiveElement.id === containerId ? "border-emerald-400 border-2 box-border" : "border-box"}`,
					// styles.card
				)}
				// onClick={() => {
				// 	activeElementHandle({
				// 		data,
				// 		containerId,
				// 		type: "container",
				// 		componentId: data?.id,
				// 		currentId: data?.id,
				// 	});
				// }}
			>
				<SelectionElementOverlay id={containerId} />
				{children}
			</div>
		</div>
	);
};

export default ContainerAction;
