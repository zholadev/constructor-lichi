import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { IElementTotal } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import SelectionElementOverlay from "../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: IElementTotal;
	containerId: string;
	componentId: string;
	widgetComponent?: boolean;
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
	const { children, data, containerId, componentId, widgetComponent } = props;

	const { editorWidgetActiveElementAction } = useDispatchAction();

	const dialog = useDialogAction();
	const previewMode = usePreviewMode();
	const activeElementHandle = useActiveElement();
	const activeElementData = useActiveElementObserver();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	/**
	 * @author Zholaman Zhumanov
	 * @description Метод для выбора активного элемента
	 */
	const onClickHandle = () => {
		if (previewMode.previewModeEditor) return;
		if (widgetComponent) {
			if (dialog.dialogWidget.open) {
				activeElementHandle({
					activeData: activeElementData?.activeData,
					containerData: activeElementData?.containerData,
					containerId: activeElementData?.containerId ?? "",
					type: activeElementData?.type ?? "none",
					componentId: activeElementData?.componentId,
					activeId: activeElementData?.activeId ?? "",
					widgetType: activeElementData?.widgetType,
					widgetData: activeElementData?.widgetData,
					widgetActiveComponentId:
						activeElementData?.widgetActiveComponentId,
					widgetActiveElementId: data.id,
					widgetActiveData: data ?? {},
					activeStyle: data.style,
					widgetActiveType: "element",
				});
			}
		} else {
			activeElementHandle({
				activeData: data,
				containerId,
				type: "element",
				componentId,
				activeId: data?.id,
				elementId: data?.id,
				widgetType: "none",
				widgetData: {},
				widgetActiveComponentId: "",
				widgetActiveData: {},
				activeStyle: {},
				widgetActiveType: "none",
			});
			editorWidgetActiveElementAction("none");
			if (dialog.dialogWidget.open) dialog.dialogWidget.toggle();
		}
	};

	return (
		<div
			className={cn(
				"cursor-pointer box-border relative",
				`${(editorActiveElement.elementId === data.id && !previewMode.previewModeEditor) || (activeElementData?.widgetActiveElementId === data.id && !previewMode.previewModeEditor) ? "border-orange-400 border-2" : ""}`
			)}
			onClick={(e) => {
				e.stopPropagation();
				onClickHandle();
			}}
		>
			<SelectionElementOverlay id={data.id} />
			{children}
		</div>
	);
};

export default ElementAction;
