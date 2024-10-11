"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DesktopIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { Tablet } from "lucide-react";
import useChangeDeviceTemplateAction from "@/components/shared/hooks/useChangeDeviceTemplateAction";

/**
 * @author Zholaman Zhumanov
 * @created 19.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const HeaderDeviceType: React.FC = () => {
	const { spaceModeDeviceType, spaceModePlatformType } = useAppSelector(
		(state) => state.space
	);

	const changeDeviceType = useChangeDeviceTemplateAction();

	return (
		<div className={cn("flex items-center gap-2 p-2")}>
			{spaceModePlatformType === "browser" && (
				<Button
					onClick={() => {
						changeDeviceType("desktop", false);
					}}
					variant={
						spaceModeDeviceType === "desktop" ? "default" : "ghost"
					}
				>
					<DesktopIcon />
				</Button>
			)}
			{spaceModePlatformType === "browser" && (
				<Button
					onClick={() => {
						changeDeviceType("laptop", false);
					}}
					variant={
						spaceModeDeviceType === "laptop" ? "default" : "ghost"
					}
				>
					<LaptopIcon />
				</Button>
			)}
			<Button
				onClick={() => {
					changeDeviceType("tablet", false);
				}}
				variant={spaceModeDeviceType === "tablet" ? "default" : "ghost"}
			>
				<Tablet width={15} height={15} />
			</Button>
			<Button
				onClick={() => {
					changeDeviceType("mobile", false);
				}}
				variant={spaceModeDeviceType === "mobile" ? "default" : "ghost"}
			>
				<MobileIcon />
			</Button>
		</div>
	);
};

export default HeaderDeviceType;
