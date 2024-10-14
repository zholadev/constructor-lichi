import React from "react";
import DocSchemaComponents from "./DocSchemaComponents";
import DocSchemaElements from "./DocSchemaElements";
import DocSchemaWidget from "./DocSchemaWidget";
import DocSchemaStyle from "./DocSchemaStyle";
import DocSchemaSettings from "./DocSchemaSettings";
import DocSchemaContent from "./DocSchemaContent";
import DocSchemaContainer from "./DocSchemaContainer";

/**
 * @author Zholaman Zhumanov
 * @created 14.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const DocSchemaDisplay: React.FC = () => {
	return (
		<>
			<DocSchemaContainer />
			<DocSchemaComponents />
			<DocSchemaElements />
			<DocSchemaWidget />
			<DocSchemaStyle />
			<DocSchemaSettings />
			<DocSchemaContent />
		</>
	);
};

export default DocSchemaDisplay;
