"use client";

import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import TemplateAddButton from "@/components/features/app/template/TemplateAddButton";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import usePermission from "@/components/shared/hooks/usePermission";
import useRemoveActions from "@/components/shared/hooks/actions/useRemoveActions";
import BoardContainerDisplay from "@/components/components/board/BoardContainerDisplay";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import {
	BottomBarTypes,
	DeviceType,
	PlatformType,
} from "@/components/shared/types/types";

/**
 * @author Zholaman Zhumanov
 * @created 27.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring, editor mode container, delete console
 * @fixme
 * @constructor
 */
const BoardContainer: React.FC = () => {
	const {
		spaceTemplateData,
		spaceModePlatformType,
		spaceBottomBarType,
		spaceModeDeviceType,
	} = useAppSelector((state) => state.space);
	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);

	const permission = usePermission();
	const previewMode = usePreviewMode();
	const removeActions = useRemoveActions();
	const activeElementData = useActiveElementObserver();

	const heightSizeMode = useMemo(() => {
		const platform = spaceModePlatformType as PlatformType;
		const bottomType = spaceBottomBarType as BottomBarTypes;

		if (platform === "app" && bottomType === "default") {
			return {
				height: "calc(100% - 63px)",
			};
		}

		return {
			height: "100%",
		};
	}, [spaceModePlatformType, spaceBottomBarType]);

	const customScroll = useMemo(() => {
		const device = spaceModeDeviceType as DeviceType;

		if (device === "desktop" || device === "laptop") {
			return "";
		}

		return "custom-scrollbar";
	}, [spaceModeDeviceType]);

	useMemo(() => {
		console.log("spaceTemplateData", spaceTemplateData);
		console.log("activeElementData", activeElementData);
	}, [spaceTemplateData, activeElementData]);

	return (
		<div
			className={cn("overflow-y-auto", customScroll)}
			style={heightSizeMode}
		>
			{spaceTemplateData.map((container: ISchemaContainer) => {
				return (
					<div key={container.id} className={cn("w-full relative")}>
						{editorRemoveTemplate && (
							<div
								className={cn(
									"w-full h-full hover:bg-red-500 opacity-50 duration-75 z-10 absolute ease-in-out top-0 left-0 transition-all flex justify-center items-center"
								)}
								onClick={() =>
									removeActions.removeContainer(container.id)
								}
							/>
						)}

						<BoardContainerDisplay
							containerData={container}
							containerType={container.type}
							displayType={container.display}
						/>
					</div>
				);
			})}

			{!previewMode.previewModeEditor && <TemplateAddButton />}
		</div>
	);
};

export default BoardContainer;
