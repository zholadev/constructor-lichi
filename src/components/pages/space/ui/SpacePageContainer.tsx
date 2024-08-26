import React from "react";
import HeaderToolbar from "@/components/widgets/header/ui/HeaderToolbar";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import LeftToolbar from "@/components/components/toolbar/ui/LeftToolbar";
import { cn } from "@/components/lib/utils";
import WhiteBoard from "@/components/components/editor/ui/components/WhiteBoard";
import RightToolbar from "@/components/components/toolbar/ui/RightToolbar";
import DialogCreateDirectory from "@/components/widgets/gallery/ui/dialog/ui/DialogCreateDirectory";
import DialogUploadFile from "@/components/widgets/gallery/ui/dialog/ui/DialogUploadFile";
import GalleryDialogContainer from "@/components/widgets/gallery/ui/GalleryDialogContainer";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpacePageContainer: React.FC<Props> = (props) => {
	const {} = props;

	const {
		spaceTemplateData,
		spaceModeTheme,
		spaceModeLanguage,
		spaceModePreviewShop,
		spaceModeDeviceType,
		spaceModeDeviceFrame,
		spaceModeTemplateType,
		spaceModePlatformType,
		spaceTemplatePageId,
	} = useAppSelector((state) => state.space);

	return (
		<>
			<HeaderToolbar title={spaceTemplateData?.name} />

			<div className={cn("flex flex-row")}>
				<LeftToolbar />
				<WhiteBoard />
				<RightToolbar />
			</div>

			<DialogCreateDirectory />
			<DialogUploadFile />
			<GalleryDialogContainer />
		</>
	);
};

export default SpacePageContainer;
