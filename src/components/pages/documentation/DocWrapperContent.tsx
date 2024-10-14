import React from "react";
import { cn } from "@/components/lib/utils";
import JsonViewContent from "@/components/shared/jsonView/JsonViewContent";
import Divider from "@/components/shared/uikit/divider/Divider";

interface Props {
	schema_json: Record<string, unknown>;
	children: React.ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 13.10.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const DocWrapperContent: React.FC<Props> = (props) => {
	const { schema_json, children } = props;

	const parseJSON = JSON.parse(JSON.stringify(schema_json));

	return (
		<>
			<Divider spacing="large" />
			<div className={cn("w-full grid grid-cols-2 gap-40 mb-4")}>
				<div className={cn("")}>
					<JsonViewContent fullHeight jsonData={parseJSON} />
				</div>
				<article className={cn("bg-secondary border p-3 rounded-md")}>
					{children}
				</article>
			</div>
		</>
	);
};

export default DocWrapperContent;
