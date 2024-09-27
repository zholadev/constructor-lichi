"use client";

import React from "react";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import BoardEmptyCard from "@/components/components/board/BoardEmptyCard";
import { IComponentTotalDataSchema } from "@/components/features/app/blocks/types/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import Video from "../base/Video";
import Card from "../base/Card";
import CardOutside from "../base/CardOutside";
import Album from "../base/Album";

interface Props {
	type: ComponentBaseTypes;
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	componentId: string;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description
 * @last-updated
 * @update-description
 * @todo refactoring - types, code
 * @fixme
 * @param props
 * @constructor
 */
const BaseComponentRender: React.FC<Props> = (props) => {
	const { type, componentData, containerData, componentId } = props;

	const renderComponents = () => {
		switch (type) {
			case "card":
				return (
					<Card
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
					/>
				);
			case "card_outside":
				return (
					<CardOutside
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
					/>
				);
			case "album":
				return (
					<Album
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
					/>
				);
			case "video":
				return (
					<Video
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
					/>
				);
			default:
				return (
					<BoardEmptyCard
						componentId={componentId}
						containerData={containerData}
					/>
				);
		}
	};

	return renderComponents();
};

export default BaseComponentRender;
