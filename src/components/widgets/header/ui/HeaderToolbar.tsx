"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import HeaderTitle from "@/components/widgets/header/ui/HeaderTitle";
import HeaderDeviceType from "@/components/widgets/header/ui/HeaderDeviceType";
import HeaderActionPanel from "@/components/widgets/header/ui/HeaderActionPanel";

interface Props {}

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @param props
 * @constructor
 */
const HeaderToolbar: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div
			className={cn(
				"w-full h-[60px] border-b flex items-center justify-between px-4"
			)}
		>
			<HeaderTitle title="Langding Page" />
			<HeaderDeviceType />
			<HeaderActionPanel />
		</div>
	);
};

export default HeaderToolbar;
