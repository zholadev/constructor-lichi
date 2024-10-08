import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";

/**
 * @author Zholaman Zhumanov
 * @created 08.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const PreviewTemplate: React.FC = () => {
	const {
		spaceModeDeviceType,
		spaceModePlatformType,
		spaceTemplateSchemaDevicesData,
	} = useAppSelector((state) => state.space);

	const { editorPreviewMode } = useAppSelector((state) => state.editor);

	return (
		<div className={cn("w-full")}>
			<div
				className={cn(
					"w-full h-[90px] flex items-center justify-between"
				)}
			/>

			<div className={cn("w-full")} />
		</div>
	);
};

export default PreviewTemplate;
