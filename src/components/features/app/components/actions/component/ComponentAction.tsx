import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import SelectionElementOverlay from "../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: IComponentTotalDataSchema;
	containerId: string;
	cls?: string;
	additionalActiveEvent?: boolean;
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
	const { children, data, containerId, cls, additionalActiveEvent } = props;

	const activeElementHandle = useActiveElement();
	const activeElementData = useActiveElementFollowUp();

	const { editorActiveElement, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для выбора активного элемента
	 */
	const onClickHandle = () => {
		if (additionalActiveEvent) {
			if (editorAdditionalActiveElement === "stories") {
				activeElementHandle({
					data: activeElementData.data,
					containerId: activeElementData.containerId,
					type: activeElementData.type,
					componentId: activeElementData.id,
					currentId: activeElementData.currentActiveId,
					additionalData: activeElementData.additionalData,
					additionalType: activeElementData.additionalType,
					additionalCurrentId: data.id,
				});
			}
		} else {
			activeElementHandle({
				data,
				containerId,
				type: "component",
				componentId: data?.id,
				currentId: data?.id,
			});
		}
	};

	return (
		<div className={cn("relative select-none")}>
			<div
				className={cn(
					`${editorActiveElement.id === data.id || activeElementData.additionalCurrentId === data.id ? "border-emerald-400 border-2 box-border" : "border-box"}`,
					styles.card,
					cls
				)}
				onClick={onClickHandle}
			>
				<SelectionElementOverlay id={data.id} />
				{children}
			</div>
		</div>
	);
};

export default ComponentAction;
