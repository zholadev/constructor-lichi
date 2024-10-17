import React from "react";
import { WidgetTypes } from "@/components/features/app/modules/widgets/types/interface-widget";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";
import { ISchemaComponent } from "@/components/shared/types/interface-schema-component";
import StoriesContent from "../stories/StoriesContent";

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const WidgetTypeDisplay: React.FC = () => {
	const activeElementData = useActiveElementObserver();

	const widgetData = activeElementData?.selectActiveData as ISchemaComponent;

	const renderWidget = (type: WidgetTypes) => {
		switch (type) {
			case "stories":
				return <StoriesContent />;
			case "none":
				return null;
			default:
				return null;
		}
	};

	return renderWidget(widgetData?.widgets?.type ?? "none");
};

export default WidgetTypeDisplay;
