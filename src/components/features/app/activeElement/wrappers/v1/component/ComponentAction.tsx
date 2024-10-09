import React from "react";
import { cn } from "@/components/lib/utils";
import styles from "@/components/styles/card.module.sass";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import SelectionElementOverlay from "../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: ISchemaComponent;
	containerId: string;
	cls?: string;
	widgetComponent?: boolean;
	containerData: ISchemaContainer;
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
	const { children, data, containerId, cls, widgetComponent, containerData } =
		props;

	const activeElementHandle = useActiveElement();
	const previewMode = usePreviewMode();
	const activeElementData = useActiveElementObserver();

	const { editorActiveElement, editorAdditionalActiveElement } =
		useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для выбора активного элемента
	 */
	const onClickHandle = () => {
		// if (!data?.type) return;
		if (previewMode.previewModeEditor) return;
		if (widgetComponent) {
			if (editorAdditionalActiveElement === "stories") {
				activeElementHandle({
					activeData: activeElementData?.activeData,
					containerData: activeElementData?.containerData,
					containerId: activeElementData?.containerId ?? "",
					type: activeElementData?.type ?? "none",
					componentId: activeElementData?.componentId,
					activeId: activeElementData?.activeId ?? "",
					widgetType: activeElementData?.widgetType,
					widgetData: activeElementData?.widgetData,
					widgetActiveComponentId: data.id,
					widgetActiveData: data,
					activeStyle: data.style,
					widgetActiveType: "component",
				});
			}
		} else {
			activeElementHandle({
				activeData: data,
				containerId,
				type: "component",
				componentId: data?.id,
				activeId: data?.id,
			});
		}
	};

	return (
		<div className={cn("relative select-none")}>
			<div
				className={cn(
					`${(editorActiveElement.componentId === data.id && !previewMode.previewModeEditor) || (activeElementData?.widgetActiveComponentId === data.id && !previewMode.previewModeEditor) ? "border-emerald-400 border-2 box-border" : "border-box"}`,
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
