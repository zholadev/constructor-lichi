import React from "react";
import { cn } from "@/components/lib/utils";
import HeaderToolbar from "@/components/widgets/header/ui/HeaderToolbar";
import { useAppSelector } from "@/components/app/store/hooks/hooks";

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

	return <HeaderToolbar title={spaceTemplateData?.name} />;
};

export default SpacePageContainer;
