import React from "react";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { ElementBaseTypes } from "@/components/shared/types/types-components";

interface Props {
	children: React.ReactNode;
	data: ElementBaseTypes;
	containerId: string;
	componentId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 17.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const ElementAction: React.FC<Props> = (props) => {
	const { children, data, containerId, componentId } = props;

	const { editorActiveElementAction } = useDispatchAction();

	const { editorActiveElement, editorNavigatorHoverId } = useAppSelector(
		(state) => state.editor
	);

	return (
		<div
			className={cn(
				"cursor-pointer box-border",
				`${editorActiveElement.currentActiveId === data.id || editorNavigatorHoverId === data.id ? "border-emerald-400 border-2" : ""}`
			)}
			onClick={(e) => {
				e.stopPropagation();
				editorActiveElementAction({
					id: componentId,
					containerId,
					type: "element",
					style: data?.style,
					componentData: data,
					currentActiveId: data.id,
				});
			}}
		>
			{children}
		</div>
	);
};

export default ElementAction;
