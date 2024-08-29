import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { cn } from "@/components/lib/utils";
import DeviceEmulatorContainer from "@/components/widgets/device/ui/DeviceEmulatorContainer";
import { Skeleton } from "@/components/shared/shadcn/ui/skeleton";
import BoardContainer from "@/components/components/board/ui/BoardContainer";
import {
	deviceLaptopBanList,
	deviceMobileBanList,
	deviceTabletBanList,
} from "@/components/shared/constants/data";

/**
 * @author Zholaman Zhumanov
 * @created 20.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const WhiteBoard: React.FC = () => {
	const { spaceModeDeviceType, spaceTemplateApiLoading } = useAppSelector(
		(state) => state.space
	);

	if (spaceTemplateApiLoading) {
		return (
			<div
				className={cn(
					"p-3 size-full flex flex-col items-center justify-center w-full"
				)}
			>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton key={index} className="h-[290px] w-full mb-4" />
				))}
			</div>
		);
	}

	return (
		<div className={cn("w-full bg-secondary p-2 h-screen overflow-y-auto")}>
			{spaceModeDeviceType === "desktop" ? (
				<BoardContainer />
			) : spaceModeDeviceType === "laptop" ? (
				<div className={cn("flex items-center justify-center mt-10")}>
					<DeviceEmulatorContainer devices={deviceLaptopBanList}>
						<BoardContainer />
					</DeviceEmulatorContainer>
				</div>
			) : spaceModeDeviceType === "tablet" ? (
				<div className={cn("flex items-center justify-center mt-10")}>
					<DeviceEmulatorContainer devices={deviceTabletBanList}>
						<BoardContainer />
					</DeviceEmulatorContainer>
				</div>
			) : spaceModeDeviceType === "mobile" ? (
				<div className={cn("flex items-center justify-center mt-10")}>
					<DeviceEmulatorContainer devices={deviceMobileBanList}>
						<BoardContainer />
					</DeviceEmulatorContainer>
				</div>
			) : null}
		</div>
	);
};

export default WhiteBoard;
