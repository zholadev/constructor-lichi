import React from "react";
import { cn } from "@/components/lib/utils";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const RightToolbar: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div
			className={cn("w-[340px] border")}
			style={{ height: "calc(100vh - 60px)" }}
		>
			content
		</div>
	);
};

export default RightToolbar;
