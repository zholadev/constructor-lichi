"use client";

import React from "react";
import HeaderToolbar from "@/components/widgets/header/HeaderToolbar";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import PanelComponent from "@/components/features/app/panel/container/PanelComponent";
import { cn } from "@/components/lib/utils";
import WhiteBoard from "@/components/components/editor/WhiteBoard";
import PanelContent from "@/components/features/app/panel/container/PanelContent";
import DialogCreateDirectory from "@/components/widgets/gallery/dialog/DialogCreateDirectory";
import DialogUploadFile from "@/components/widgets/gallery/dialog/DialogUploadFile";
import TemplateAddDialog from "@/components/components/editor/TemplateAddDialog";
import DialogContainer from "@/components/widgets/dialog/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import AddBaseComponent from "@/components/features/app/components/add/AddBaseComponent";

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

	const { spaceTemplateData } = useAppSelector((state) => state.space);

	return (
		<>
			<HeaderToolbar title={spaceTemplateData?.name} />

			<div className={cn("flex flex-row")}>
				<PanelComponent />
				<WhiteBoard />
				<PanelContent />
			</div>

			<DialogContainer
				open={dialog.dialogAddComponent.open}
				toggle={dialog.dialogAddComponent.toggle}
			>
				<AddBaseComponent />
			</DialogContainer>

			<DialogCreateDirectory />
			<DialogUploadFile />
			<TemplateAddDialog />
		</>
	);
};

export default SpacePageContainer;
