import React from "react";
import {
	DeviceEmulator,
	DeviceFrameset,
	DeviceFramesetProps,
} from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";
import "react-device-frameset/styles/device-emulator.min.css";

interface Props {
	children: React.ReactNode;
}

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
const DeviceEmulatorContainer: React.FC<Props> = (props) => {
	const { children } = props;

	return (
		<DeviceEmulator>
			{(deviceProps: DeviceFramesetProps) => (
				<DeviceFrameset landscape={false} {...deviceProps}>
					{children}
				</DeviceFrameset>
			)}
		</DeviceEmulator>
	);
};

export default DeviceEmulatorContainer;
