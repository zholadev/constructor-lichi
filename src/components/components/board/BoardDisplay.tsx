import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import BoardContainer from "@/components/components/board/BoardContainer";
import { cn } from "@/components/lib/utils";
import {
	deviceLaptopBanList,
	deviceMobileBanList,
	deviceTabletBanList,
} from "@/components/shared/constants/data";
import DeviceEmulatorContainer from "@/components/widgets/device/DeviceEmulatorContainer";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const BoardDisplay: React.FC = () => {
	const { spaceModeDeviceType } = useAppSelector((state) => state.space);

	const renderBoardType = (): React.JSX.Element => {
		switch (spaceModeDeviceType as DeviceType) {
			case "desktop":
				return <BoardContainer />;
			case "laptop":
				return (
					<DeviceEmulatorContainer
						key="laptop"
						devices={deviceLaptopBanList}
					>
						<BoardContainer />
					</DeviceEmulatorContainer>
				);
			case "tablet":
				return (
					<DeviceEmulatorContainer
						key="tablet"
						devices={deviceTabletBanList}
					>
						<BoardContainer />
					</DeviceEmulatorContainer>
				);
			case "mobile":
				return (
					<DeviceEmulatorContainer
						key="mobile"
						devices={deviceMobileBanList}
					>
						<BoardContainer />
					</DeviceEmulatorContainer>
				);
			default:
				return (
					<div
						className={cn(
							"size-full flex items-center justify-center"
						)}
					>
						<h1>Выберите тип устройство</h1>
					</div>
				);
		}
	};

	return renderBoardType();
};

export default BoardDisplay;
