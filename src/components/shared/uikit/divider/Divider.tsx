import React from "react";
import { cn } from "@/components/lib/utils";

type DivideSpacing = "small" | "medium" | "large";

interface Props {
	spacing?: DivideSpacing;
	style?: React.CSSProperties;
}

const spacingStyles: Record<DivideSpacing, string> = {
	smail: "my-2",
	medium: "my-5",
	large: "my-8",
};

/**
 * @author Zholaman Zhumanov
 * @created 28.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo Типизация
 * @fixme
 * @param props
 * @constructor
 */
const Divider: React.FC<Props> = (props) => {
	const { spacing = "small", style } = props;

	return (
		<div
			className={cn("w-full h-[1px] border-b", spacingStyles[spacing])}
			style={style}
		/>
	);
};

export default Divider;
