"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DesktopIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";

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
const HeaderDeviceType: React.FC<Props> = (props) => {
	const {} = props;

	return (
		<div className={cn("flex items-center bg-secondary p-2")}>
			<Button>
				<DesktopIcon />
			</Button>
			<Button variant="ghost">
				<LaptopIcon />
			</Button>
			<Button variant="ghost">
				<MobileIcon />
			</Button>
		</div>
	);
};

export default HeaderDeviceType;
