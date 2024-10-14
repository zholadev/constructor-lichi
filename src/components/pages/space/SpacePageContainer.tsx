"use client";

import React from "react";
import HeaderToolbar from "@/components/widgets/header/HeaderToolbar";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import PanelComponent from "@/components/components/panel/PanelComponent";
import { cn } from "@/components/lib/utils";
import WhiteBoard from "@/components/components/editor/WhiteBoard";
import PanelContent from "@/components/components/panel/PanelContent";
import DialogCreateDirectory from "@/components/widgets/gallery/dialog/DialogCreateDirectory";
import DialogUploadFile from "@/components/widgets/gallery/dialog/DialogUploadFile";
import TemplateAddDialog from "@/components/features/app/template/TemplateAddDialog";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import ComponentLibrary from "@/components/features/app/modules/components/library/v1/ComponentLibrary";
import SchemaView from "@/components/components/editor/SchemaView";
import CopyTemplate from "@/components/components/template/CopyTemplate";
import WidgetContainer from "@/components/features/app/modules/widgets/container/WidgetContainer";

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const SpacePageContainer: React.FC = () => {
	const dialog = useDialogAction();

	const { spaceTemplateActionData } = useAppSelector((state) => state.space);

	return (
		<>
			<div className={cn("w-full")}>
				<HeaderToolbar title={spaceTemplateActionData?.name} />

				<div className={cn("flex flex-row relative")}>
					<PanelComponent />
					<WhiteBoard />
					<PanelContent />
				</div>

				<DialogContainer
					open={dialog.dialogAddComponent.open}
					toggle={dialog.dialogAddComponent.toggle}
				>
					<ComponentLibrary eventType="new" />
				</DialogContainer>
			</div>

			<SchemaView />
			<WidgetContainer />
			<DialogCreateDirectory />
			<DialogUploadFile />
			<TemplateAddDialog />
			<CopyTemplate />
		</>
	);
};

export default SpacePageContainer;
