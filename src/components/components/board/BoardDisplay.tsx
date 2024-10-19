import React from "react";
import { useAppSelector } from "@/components/app/store/hooks/hooks";
import { DeviceType } from "@/components/shared/types/types";
import BoardContainer from "@/components/components/board/BoardContainer";
import { cn } from "@/components/lib/utils";
import {
	deviceDesktopList,
	deviceMobileList,
	deviceTabletList,
} from "@/components/shared/constants/data";
import DeviceEmulatorContainer from "@/components/widgets/device/DeviceEmulatorContainer";
import BottomBarDefault from "@/components/components/bottomBar/BottomBarDefault";

/**
 * @author Zholaman Zhumanov
 * @created 29.08.2024
 * @description Компонент для вывода доски с текущим выбранным устройством
 * @last-updated
 * @update-description
 * @todo
 * @fixme
 * @constructor
 */
const BoardDisplay: React.FC = () => {
	const { spaceModeDeviceType, spaceModePlatformType } = useAppSelector(
		(state) => state.space
	);

	const renderBoardType = (): React.JSX.Element => {
		switch (spaceModeDeviceType as DeviceType) {
			case "desktop":
				return <BoardContainer />;
			case "laptop":
				return (
					<DeviceEmulatorContainer
						key="laptop"
						devices={deviceDesktopList}
					>
						<BoardContainer />
					</DeviceEmulatorContainer>
				);
			case "tablet":
				return (
					<DeviceEmulatorContainer
						key="tablet"
						devices={deviceTabletList}
					>
						<BoardContainer />
						{spaceModePlatformType === "app" && (
							<BottomBarDefault />
						)}
					</DeviceEmulatorContainer>
				);
			case "mobile":
				return (
					<DeviceEmulatorContainer
						key="mobile"
						devices={deviceMobileList}
					>
						<BoardContainer />
						{spaceModePlatformType === "app" && (
							<BottomBarDefault />
						)}
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
