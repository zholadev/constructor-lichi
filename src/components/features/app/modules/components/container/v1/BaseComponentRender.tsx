"use client";

import React from "react";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import BoardEmptyCard from "@/components/components/board/BoardEmptyCard";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import Card from "@/components/features/app/modules/components/components/base/v1/Card";
import CardOutside from "@/components/features/app/modules/components/components/base/v1/CardOutside";
import Album from "@/components/features/app/modules/components/components/base/v1/Album";
import ComponentAction from "@/components/features/app/activeElement/wrappers/v1/component/ComponentAction";
import usePreviewMode from "@/components/shared/hooks/usePreviewMode";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	type: ComponentBaseTypes;
	componentData: ISchemaComponent;
	containerData: ISchemaContainer;
	componentId: string;
	widgetComponent?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 03.09.2024
 * @description Компонент для вывода обычных компонентов v1
 * @last-updated
 * @update-description
 * @todo refactoring
 * @fixme
 * @param props
 * @constructor
 */
const BaseComponentRender: React.FC<Props> = (props) => {
	const {
		type,
		componentData,
		containerData,
		componentId,
		widgetComponent = false,
	} = props;

	const previewMode = usePreviewMode();

	const renderComponents = () => {
		switch (type) {
			case "card":
				return (
					<Card
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
						widgetComponent={widgetComponent}
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
			default:
				return previewMode.previewModeEditor ? null : (
					<BoardEmptyCard
						componentId={componentId}
						containerData={containerData}
					/>
				);
		}
	};

	return (
		<ComponentAction
			containerId={containerData.id}
			data={componentData}
			widgetComponent={widgetComponent}
			containerData={containerData}
		>
			{renderComponents()}
		</ComponentAction>
	);
};

export default BaseComponentRender;
