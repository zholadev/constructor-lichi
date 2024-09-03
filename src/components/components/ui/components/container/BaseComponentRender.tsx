import React from "react";
import { ComponentBaseTypes } from "@/components/shared/types/types-components";
import Card from "@/components/components/ui/components/base/Card";
import BoardEmptyCard from "@/components/components/board/ui/BoardEmptyCard";
import {
	IComponentBaseSchema,
	ITemplateBaseSchema,
} from "@/components/shared/types/interface-templates";
import CardOutside from "@/components/components/ui/components/base/CardOutside";

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
