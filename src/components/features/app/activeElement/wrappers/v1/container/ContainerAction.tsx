import React from "react";
import useActiveElement from "@/components/shared/hooks/useActiveElement";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import SelectionElementOverlay from "../../../selection/SelectionElementOverlay";

interface Props {
	children: React.ReactNode;
	containerData: ISchemaContainer;
	containerId: string;
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
	const { children, containerData, containerId } = props;

	const { editorWidgetActiveElementAction } = useDispatchAction();

	const dialog = useDialogAction();
	const previewMode = usePreviewMode();
	const activeElementHandle = useActiveElement();

	const { editorActiveElement } = useAppSelector((state) => state.editor);

	const onClickHandle = () => {
		if (previewMode.previewModeEditor) return;
		activeElementHandle({
			selectActiveData: containerData ?? null,
			selectType: "container",
			selectComponentId: containerData?.id ?? "",
			selectWidgetActiveId: "",
			selectActiveId: containerData?.id ?? "",
			selectContainerId: containerId ?? "",
			selectElementId: "",
			selectWidgetActiveData: null,
			selectWidgetActiveType: "none",
		});
		editorWidgetActiveElementAction("none");
		if (dialog.dialogWidget.open) dialog.dialogWidget.toggle();
	};

	return (
		<div className={cn("size-full relative")}>
			<div
				className={cn(
					`${editorActiveElement?.selectActiveId === containerId && !previewMode.previewModeEditor ? "border-emerald-400 border-2 box-border" : "border-box"}`,
					"min-h-[10px]"
				)}
				onDoubleClick={onClickHandle}
			>
				<SelectionElementOverlay id={containerId} />
				{children}
			</div>
		</div>
	);
};

export default ContainerAction;
