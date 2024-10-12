"use client";

import React from "react";
import {
	DisplayContainerType,
	IContainerType,
} from "@/components/shared/types/types";
import Container from "@/components/features/app/modules/container/container/v1/Container";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import ContainerAction from "@/components/features/app/activeElement/wrappers/v1/container/ContainerAction";
import SwiperContainer from "@/components/features/app/modules/container/swiper/v1/SwiperContainer";
import CategoryListContainer from "@/components/features/app/modules/container/categoryList/v1/CategoryListContainer";
import SaintLaurentContainer from "@/components/features/app/modules/container/saint_laurent/v1/SaintLaurentContainer";
import { cn } from "@/components/lib/utils";
import SaintLaurentSwiperContainer from "@/components/features/app/modules/container/saint_laurent/v1/SaintLaurentSwiperContainer";

interface Props {
	containerType: IContainerType;
	containerData: ISchemaContainer;
	displayType: DisplayContainerType;
}

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description Компонент для вывода контейнера в доску
 * @last-updated
 * @update-description
 * @todo Types
 * @fixme
 * @param props
 * @constructor
 */
const BoardContainerDisplay: React.FC<Props> = (props) => {
	const { containerType, containerData, displayType } = props;

	const renderContainers = () => {
		switch (containerType) {
			case "container":
				return displayType === "swiper" ? (
					<SwiperContainer
						componentsData={containerData?.components}
						swiperSettings={containerData.settings.swiper}
						swiperStyles={containerData.style}
						containerData={containerData}
					/>
				) : (
					<Container
						componentsData={containerData.components}
						container={containerData}
					/>
				);
			case "category_list_container":
				return (
					<CategoryListContainer
						componentsData={containerData.components}
						swiperSettings={containerData.settings.swiper}
						swiperStyles={containerData.style}
						containerData={containerData}
						categoryListParams={
							containerData.settings?.categoryList
						}
					/>
				);
			case "saint_laurent_container":
				return displayType === "block" ? (
					<SaintLaurentContainer
						componentsData={containerData.components}
						containerData={containerData}
					/>
				) : (
					<SaintLaurentSwiperContainer
						componentsData={containerData.components}
						swiperSettings={containerData.settings.swiper}
						swiperStyles={containerData.style}
						containerData={containerData}
						categoryListParams={
							containerData.settings?.categoryList
						}
					/>
				);
			case "initial":
				return (
					<div
						className={cn(
							"size-full flex items-center justify-center"
						)}
					>
						<h2>Добавьте контейнер для вывода к доске</h2>
					</div>
				);
			default:
				return (
					<div
						className={cn(
							"size-full flex items-center justify-center"
						)}
					>
						<h2>Добавьте контейнер для вывода к доске</h2>
					</div>
				);
		}
	};

	return (
		<ContainerAction
			containerData={containerData}
			containerId={containerData.id}
		>
			{renderContainers()}
		</ContainerAction>
	);
};

export default BoardContainerDisplay;
