import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import SelectionElementOverlay from "../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: IComponentTotalDataSchema;
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

	const activeElementHandle = useActiveElement();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	return (
		<div className={cn("size-full relative")}>
			<div
				className={cn(
					`${editorActiveElement.id === data.id ? "border-emerald-400 border-2 box-border" : "border-box"}`,
					styles.card
				)}
				onClick={() => {
					activeElementHandle({
						data,
						containerId,
						type: "component",
						componentId: data?.id,
						currentId: data?.id,
					});
				}}
			>
				<SelectionElementOverlay id={data.id} />
				{children}
			</div>
		</div>
	);
};

export default ComponentAction;
