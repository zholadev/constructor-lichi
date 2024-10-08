import React from "react";
import { ComponentSpecialTypes } from "@/components/shared/types/types-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import BoardEmptyCard from "@/components/components/board/BoardEmptyCard";
import SaintLaurent from "@/components/features/app/modules/components/components/special/v1/saintLaurent/SaintLaurent";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";

interface Props {
	type: ComponentSpecialTypes;
	componentData: ISchemaComponent;
	containerData: ISchemaContainer;
	componentId: string;
	componentIndex?: number;
	componentLen?: number;
}

/**
 * @author Zholaman Zhumanov
 * @created 02.10.2024
 * @description Компонент для вывода особенных компонентов v1
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const SpecialComponentRender: React.FC<Props> = (props) => {
	const {
		type,
		componentData,
		containerData,
		componentId,
		componentIndex,
		componentLen,
	} = props;

	const renderComponents = () => {
		switch (type) {
			case "saint_laurent":
				return (
					<SaintLaurent
						componentData={componentData}
						containerId={containerData.id}
						containerData={containerData}
						componentLen={componentLen}
						componentIndex={componentIndex}
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

export default SpecialComponentRender;
