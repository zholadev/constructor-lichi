"use client";

import React from "react";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import BoardEmptyCard from "@/components/components/board/BoardEmptyCard";
import {
	IComponentBaseSchema,
	ITemplateBaseSchema,
} from "@/components/shared/types/interface-templates";
import Card from "../base/Card";
import CardOutside from "../base/CardOutside";
import Album from "../base/Album";

interface Props {
	type: ComponentBaseTypes;
	data?: IComponentBaseSchema;
	template: ITemplateBaseSchema;
	currentItemData: {
		id: string;
		data?: IComponentBaseSchema;
		is_selected?: boolean;
	};
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
	const { type, data, template, currentItemData } = props;

	const renderComponents = () => {
		switch (type) {
			case "card":
				return <Card data={data} containerId={template.id} />;
			case "card_outside":
				return <CardOutside data={data} containerId={template.id} />;
			case "album":
				return <Album data={data} containerId={template.id} />;
			default:
				return (
					<BoardEmptyCard
						currentItemData={currentItemData}
						template={template}
					/>
				);
		}
	};

	return renderComponents();
};

export default BaseComponentRender;
