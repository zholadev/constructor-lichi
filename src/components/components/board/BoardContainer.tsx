"use client";

import React, { useMemo } from "react";
import { cn } from "@/components/lib/utils";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import useTemplateEvent from "@/components/shared/hooks/useTemplateEvent";
import TemplateAddButton from "@/components/features/app/containerTemplate/TemplateAddButton";
import ContainerAction from "@/components/features/app/components/actions/container/ContainerAction";
import useActiveElementFollowUp from "@/components/shared/hooks/useActiveElementFollowUp";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import usePermission from "@/components/shared/hooks/usePermission";
import SwiperContainer from "@/components/features/app/ui/container/swiper/v1/SwiperContainer";
import Container from "@/components/features/app/ui/container/container/v1/Container";
import SaintLaurentContainer from "@/components/features/app/ui/container/saint_laurent/v1/SaintLaurentContainer";
import CategoryListContainer from "@/components/features/app/ui/container/categoryList/v1/CategoryListContainer";

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
	const templateEvent = useTemplateEvent();

	const { spaceTemplateData } = useAppSelector((state) => state.space);
	const { editorRemoveTemplate } = useAppSelector((state) => state.editor);

	const permission = usePermission();
	const activeElementData = useActiveElementFollowUp();

	useMemo(() => {
		console.log("spaceTemplateData", spaceTemplateData);
		console.log("permission", permission);
		console.log("activeElementData", activeElementData);
	}, [spaceTemplateData, activeElementData]);

	return (
		<div className={cn("h-full overflow-y-auto")}>
			{spaceTemplateData.map((container: ISchemaContainer) => {
				return (
					<div key={container.id} className={cn("w-full relative")}>
						{editorRemoveTemplate && (
							<div
								className={cn(
									"w-full h-full hover:bg-red-500 opacity-50 duration-75 z-10 absolute ease-in-out top-0 left-0 transition-all flex justify-center items-center"
								)}
								onClick={() =>
									templateEvent.deleteContainer(container.id)
								}
							/>
						)}

						<ContainerAction
							containerId={container.id}
							componentType={container.type}
						>
							{container.type === "swiper" ? (
								<SwiperContainer
									componentsData={container.components}
									swiperSettings={container.settings.swiper}
									swiperStyles={container.style}
									container={container}
								/>
							) : container.type === "saint_laurent_container" ? (
								<SaintLaurentContainer
									componentsData={container.components}
									container={container}
								/>
							) : container.type === "category_list_container" ? (
								<CategoryListContainer
									componentsData={container.components}
									swiperSettings={container.settings.swiper}
									swiperStyles={container.style}
									container={container}
									categoryListParams={
										container.settings?.categoryList
									}
								/>
							) : (
								<Container
									componentsData={container.components}
									container={container}
								/>
							)}
						</ContainerAction>
					</div>
				);
			})}
			<TemplateAddButton />
		</div>
	);
};

export default BoardContainer;
