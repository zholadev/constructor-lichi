"use client";

import React from "react";
import HeaderToolbar from "@/components/widgets/header/ui/HeaderToolbar";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import LeftToolbar from "@/components/components/toolbar/ui/LeftToolbar";
import { cn } from "@/components/lib/utils";
import WhiteBoard from "@/components/components/editor/ui/components/WhiteBoard";
import RightToolbar from "@/components/components/toolbar/ui/RightToolbar";
import DialogCreateDirectory from "@/components/widgets/gallery/ui/dialog/ui/DialogCreateDirectory";
import DialogUploadFile from "@/components/widgets/gallery/ui/dialog/ui/DialogUploadFile";
import TemplateAddDialog from "@/components/components/editor/ui/components/TemplateAddDialog";
import DialogContainer from "@/components/widgets/dialog/ui/DialogContainer";
import useDialogAction from "@/components/shared/hooks/useDialogAction";
import ComponentBaseContent from "@/components/entities/schema/ui/ComponentBaseContent";

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
				<LeftToolbar />
				<WhiteBoard />
				<RightToolbar />
			</div>

			<DialogContainer
				open={dialog.dialogAddComponent.open}
				toggle={dialog.dialogAddComponent.toggle}
			>
				<ComponentBaseContent />
			</DialogContainer>

			<DialogCreateDirectory />
			<DialogUploadFile />
			<TemplateAddDialog />
		</>
	);
};

export default SpacePageContainer;
