"use client";

import React from "react";
import { cn } from "@/components/lib/utils";
import { Button } from "@/components/shared/shadcn/ui/button";
import { DesktopIcon, LaptopIcon, MobileIcon } from "@radix-ui/react-icons";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import useDispatchAction from "@/components/shared/hooks/useDispatchAction";
import { Tablet } from "lucide-react";

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

	const { spaceModeDeviceTypeAction } = useDispatchAction();

	const { spaceModeDeviceType, spaceModePlatformType } = useAppSelector(
		(state) => state.space
	);

	const changeDeviceType = (value: DeviceType | null) => {
		spaceModeDeviceTypeAction(value);
	};

	return (
		<div className={cn("flex items-center bg-secondary gap-2 p-2")}>
			{spaceModePlatformType === "browser" && (
				<Button
					onClick={() => {
						changeDeviceType("desktop");
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
						changeDeviceType("laptop");
					}}
					variant={
						spaceModeDeviceType === "laptop" ? "default" : "ghost"
					}
				>
					<LaptopIcon />
				</Button>
			)}
			{spaceModePlatformType === "browser" && (
				<Button
					onClick={() => {
						changeDeviceType("tablet");
					}}
					variant={
						spaceModeDeviceType === "tablet" ? "default" : "ghost"
					}
				>
					<Tablet width={15} height={15} />
				</Button>
			)}
			<Button
				onClick={() => {
					changeDeviceType("mobile");
				}}
				variant={spaceModeDeviceType === "mobile" ? "default" : "ghost"}
			>
				<MobileIcon />
			</Button>
		</div>
	);
};

export default HeaderDeviceType;
