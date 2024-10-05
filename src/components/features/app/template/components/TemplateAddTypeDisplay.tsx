import React from "react";
import { IContainerType } from "@/components/shared/types/types";
import TemplateAddBaseContainer from "./TemplateAddBaseContainer";
import TemplateAddCategoryListContainer from "./TemplateAddCategoryListContainer";
import TemplateAddSaintLaurentContainer from "./TemplateAddSaintLaurentContainer";

interface Props {
	type: IContainerType;
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
const TemplateAddTypeDisplay: React.FC<Props> = (props) => {
	const { type } = props;

	const renderContainerType = () => {
		switch (type) {
			case "container":
				return <TemplateAddBaseContainer />;
			case "swiper":
				return <TemplateAddBaseContainer />;
			case "saint_laurent_container":
				return <TemplateAddSaintLaurentContainer />;
			case "category_list_container":
				return <TemplateAddCategoryListContainer />;
			case "initial":
				return null;
			default:
				return null;
		}
	};

	return renderContainerType();
};

export default TemplateAddTypeDisplay;
