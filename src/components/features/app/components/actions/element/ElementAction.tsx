import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { IElementTotal } from "@/components/features/app/ui/elements/types/interface-elements";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import SelectionElementOverlay from "../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: IElementTotal;
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

	const activeElementHandle = useActiveElement();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return (
		<div
			className={cn(
				"cursor-pointer box-border relative",
				`${editorActiveElement.currentActiveId === data.id ? "border-orange-400 border-2" : ""}`
			)}
			onClick={(e) => {
				e.stopPropagation();
				activeElementHandle({
					data,
					containerId,
					componentId,
					currentId: data?.id,
					type: "element",
				});
			}}
		>
			<SelectionElementOverlay id={data.id} />
			{children}
		</div>
	);
};

export default ElementAction;
