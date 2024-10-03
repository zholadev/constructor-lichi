import React from "react";
import { ComponentSpecialTypes } from "@/components/shared/types/types-components";
import { IComponentTotalDataSchema } from "@/components/features/app/ui/components/types/v1/interface-components";
import { ISchemaContainer } from "@/components/shared/types/interface-schema-container";
import BoardEmptyCard from "@/components/components/board/BoardEmptyCard";
import SaintLaurent from "@/components/features/app/ui/components/special/components/saintLaurent/v1/SaintLaurent";

interface Props {
	type: ComponentSpecialTypes;
	componentData: IComponentTotalDataSchema;
	containerData: ISchemaContainer;
	componentId: string;
	componentIndex?: number;
	componentLen?: number;
}

/**
 * @author Zholaman Zhumanov
 * @created 02.10.2024
 * @description
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
