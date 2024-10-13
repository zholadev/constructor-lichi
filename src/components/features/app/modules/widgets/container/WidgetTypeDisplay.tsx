import React from "react";
import { WidgetTypes } from "@/components/features/app/modules/widgets/types/interface-widget";
import StoriesContent from "../stories/StoriesContent";
import useActiveElementObserver from "@/components/shared/hooks/useActiveElementObserver";

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

	return renderWidget(activeElementData?.activeData?.widgets?.type);
};

export default WidgetTypeDisplay;
