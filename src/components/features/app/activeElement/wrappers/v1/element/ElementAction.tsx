import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import { ISchemaElementInterfaces } from "@/components/features/app/modules/elements/types/v1/interface-elements";
import SelectionElementOverlay from "../../../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	data: ISchemaElementInterfaces;
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
					selectActiveData:
						activeElementData?.selectActiveData ?? null,
					selectType: activeElementData?.selectType ?? "none",
					selectComponentId:
						activeElementData?.selectComponentId ?? "",
					selectWidgetActiveId: data?.id ?? "",
					selectActiveId: activeElementData?.selectActiveId ?? "",
					selectContainerId:
						activeElementData?.selectContainerId ?? "",
					selectElementId: activeElementData?.selectElementId ?? "",
					selectWidgetActiveData: data ?? null,
					selectWidgetActiveType: "element",
					selectWidgetComponentId: data.id ?? "",
				});
			}
		} else {
			activeElementHandle({
				selectActiveData: data ?? null,
				selectType: "element",
				selectComponentId: componentId ?? "",
				selectWidgetActiveId: "",
				selectActiveId: data?.id ?? "",
				selectContainerId: containerId ?? "",
				selectElementId: data?.id ?? "",
				selectWidgetActiveData: null,
				selectWidgetActiveType: "none",
				selectWidgetComponentId: "",
			});
			editorWidgetActiveElementAction("none");
			if (dialog.dialogWidget.open) dialog.dialogWidget.toggle();
		}
	};

	if (!data) {
		return null;
	}

	return (
		<div
			className={cn(
				"cursor-pointer box-border relative",
				`${(editorActiveElement?.selectElementId === data?.id && !previewMode.previewModeEditor) || (activeElementData?.selectWidgetActiveId === data.id && !previewMode.previewModeEditor) ? "border-orange-400 border-2" : ""}`
			)}
			onClick={(e) => {
				e.stopPropagation();
				onClickHandle();
			}}
		>
			<SelectionElementOverlay id={data?.id} />
			{children}
		</div>
	);
};

export default ElementAction;
