import React from "react";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { cn } from "@/components/lib/utils";

interface Props {
	jsonData: JSON;
	fullHeight?: boolean;
}

/**
 * @author Zholaman Zhumanov
 * @created 07.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const JsonViewContent: React.FC<Props> = (props) => {
	const { jsonData, fullHeight } = props;

	return (
		<div className={cn("overflow-auto")}>
			<JsonView
				data={jsonData}
				shouldExpandNode={allExpanded}
				style={{
					...darkStyles,
					container: fullHeight
						? "schema-json-view-container-full"
						: "schema-json-view-container",
				}}
			/>
		</div>
	);
};

export default JsonViewContent;
