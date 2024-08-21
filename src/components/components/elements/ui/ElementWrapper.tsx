import React, { ReactNode } from "react";
import { cn } from "@/components/lib/utils";

interface Props {
	children: ReactNode;
}

/**
 * @author Zholaman Zhumanov
 * @created 21.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const ElementWrapper: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<div
			className={cn(
				"w-full h-[100px] rounded-md relative hover:bg-secondary transition-all duration-75 text-sm cursor-pointer border mb-2 flex items-center justify-center flex-col"
			)}
		>
			{children}
		</div>
	);
};

export default ElementWrapper;
